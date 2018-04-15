import React, { Component } from "react";
import moment from "moment";
import { RaisedButton, FlatButton, Divider } from "material-ui";

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

class App extends Component {
  state = {
    stories: [],
    query: "topstories",
    index: 0
  };
  componentDidMount() {
    const { query } = this.state;
    this.fetchStories(query);
  }
  makeQuery = query => {
    this.setState({ query, index: 0 });
    this.fetchStories(query);
  };
  fetchStories = query => {
    api.storiesRef(`${query}`).once("value", snapshot => {
      api.fetchItems(snapshot.val(), this.updateStories);
    });
  };
  updateStories = data => {
    const { index, stories } = this.state;

    const newStories = data.slice(index, index + 30).map(story => ({
      id: story.id,
      title: story.title,
      by: story.by,
      url: story.url,
      points: story.score,
      commentCount: story.descendants,
      ago: moment.unix(story.time).fromNow()
    }));
    this.setState({ stories: stories.concat(newStories) });
  };
  loadMore = () => {
    let newIndex;
    const { index } = this.state;
    if (this.state.stories.length < 30) {
      newIndex = index - 30;
      this.setState({ index: newIndex });
      return;
    }
    newIndex = index + 30;
    this.setState({ index: newIndex });
    this.fetchStories(this.state.query);
  };
  render() {
    return (
      <div className="App">
        <Appbar onQueryChange={this.onQueryChange} />
        <QueryIcons makeQuery={this.makeQuery} />
        <Stories stories={this.state.stories} />
        <RaisedButton onClick={this.loadMore}>
          <b>Load more</b>
        </RaisedButton>
        <Divider />
      </div>
    );
  }
}

export default App;
