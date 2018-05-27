import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Appbar from './containers/Appbar';
import Stories from './containers/Stories';
import QueryIcons from './components/QueryIcons';
import hnApi from './network/api';

class App extends Component {
  state = {
    query: 'news',
    news: { page: 1, stories: [], hasMore: true },
    best: { page: 1, stories: [], hasMore: true },
    show: { page: 1, stories: [], hasMore: true },
    ask: { page: 1, stories: [], hasMore: true },
    jobs: { page: 1, stories: [], hasMore: true }
  };
  componentDidMount() {
    const { query } = this.state;
    this.makeQuery(query);
  }
  changeQuery = newQuery => {
    this.setState({ query: newQuery });
    this.makeQuery(newQuery);
  };
  makeQuery = (query, page = false) => {
    const { stories } = this.state[query];
    hnApi
      .fetchStories(query, page)
      .then(result => {
        if (result.data.length > 0) {
          this.setState({
            [query]: {
              ...this.state[query],
              stories: stories.concat(result.data)
            }
          });
        }
        if (result.data.length === 0) {
          this.setState({ [query]: { ...this.state[query], hasMore: false } });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  loadMore = () => {
    const { query } = this.state;
    const { page } = this.state[query];
    this.setState({
      [query]: { ...this.state[query], page: page + 1 }
    });
    this.makeQuery(query, page);
  };
  render() {
    const { query } = this.state;
    const { stories, hasMore } = this.state[query];

    return (
      <div className="App">
        <Appbar />
        <QueryIcons changeQuery={this.changeQuery} />
        <InfiniteScroll
          pullDownToRefresh={false}
          dataLength={stories.length}
          refreshFunction={this.refresh}
          next={this.loadMore}
          loader={<h4>Loading...</h4>}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more stories</b>
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
