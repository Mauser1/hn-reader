import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Main, Comments } from './pages';
import { Appbar } from './containers/';
import hnApi from './network/api';

class App extends Component {
  state = {
    query: 'news',
    news: { page: 1, stories: [], hasMore: true },
    best: { page: 1, stories: [], hasMore: true },
    show: { page: 1, stories: [], hasMore: true },
    ask: { page: 1, stories: [], hasMore: true },
    jobs: { page: 1, stories: [], hasMore: true },
    comment: ''
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
    const { query, comments } = this.state;
    const { stories, hasMore } = this.state[query];

    return (
      <div className="App">
        <Appbar />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                <Main
                  stories={stories}
                  hasMore={hasMore}
                  changeQuery={this.changeQuery}
                  loadMore={this.loadMore}
                />
              )}
            />
            <Route
              exact
              path="/:id"
              render={() => <Comments comments={comments} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
