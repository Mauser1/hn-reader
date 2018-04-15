import React, { Component } from "react";
import moment from "moment";
import { RaisedButton, FlatButton, Divider } from "material-ui";
import InfiniteScroll from "react-infinite-scroll-component";

import Appbar from "./containers/Appbar";
import Stories from "./containers/Stories";

import api from "./network/api";

const QueryIcons = props => (
  <div className="query-icons">
    <FlatButton label="Top" onClick={() => props.makeQuery("topstories")} />
    <FlatButton label="Ask" onClick={() => props.makeQuery("askstories")} />
    <FlatButton label="Show" onClick={() => props.makeQuery("showstories")} />
    <FlatButton label="Jobs" onClick={() => props.makeQuery("jobstories")} />
  </div>
);

function parseStories(index, data) {
  return data.slice(index, index + 30).map(story => ({
    id: story.id,
    title: story.title,
    by: story.by,
    url: story.url,
    points: story.score,
    commentCount: story.descendants,
    ago: moment.unix(story.time).fromNow()
  }));
}

class App extends Component {
  state = {
    stories: [],
    query: "topstories",
    index: 0,
    info: null,
    hasMore: true
  };
  componentDidMount() {
    const { query } = this.state;
    this.fetchStories(query);
  }
  fetchStories = query => {
    api.storiesRef(`${query}`).once("value", snapshot => {
      api.fetchItems(snapshot.val(), this.updateStories);
    });
  };
  updateStories = data => {
    if (this.state.index === 0) {
      this.populateStories(data);
    } else {
      this.extendStories(data);
    }
  };
  populateStories = data => {
    const index = 0;
    const stories = parseStories(index, data);
    this.setState({ stories, info: null });
  };
  extendStories = data => {
    const { index, stories } = this.state;
    const newStories = parseStories(index, data);
    this.setState({ stories: stories.concat(newStories) });
  };
  makeQuery = query => {
    this.setState({ query, index: 0, hasMore: true });
    this.fetchStories(query);
  };
  loadMore = () => {
    let newIndex;
    const { index, stories } = this.state;
    if (stories.length - index < 30) {
      newIndex = index - 30;
      this.setState({
        index: newIndex,
        info: "You have loaded all stories!",
        hasMore: false
      });
      return;
    }
    newIndex = index + 30;
    this.setState({ index: newIndex });
    this.fetchStories(this.state.query);
  };
  refresh = () => {
    const { stories } = this.state;
    const latest = stories.slice(stories.length - 30);
    return latest;
  };
  render() {
    const { stories, info, hasMore } = this.state;
    return (
      <div className="App">
        <Appbar onQueryChange={this.onQueryChange} />
        <QueryIcons makeQuery={this.makeQuery} />
        <InfiniteScroll
          pullDownToRefresh={false}
          dataLength={stories.length}
          refreshFunction={this.refresh}
          next={this.loadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>{info}</b>
            </p>
          }
        >
          <Stories stories={stories} />
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
