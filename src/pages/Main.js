import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import { Stories, QueryIcons } from '../containers';

const Main = ({ stories, changeQuery, loadMore, hasMore }) => (
  <div>
    <QueryIcons changeQuery={changeQuery} />
    <InfiniteScroll
      pullDownToRefresh={false}
      dataLength={stories.length}
      next={loadMore}
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

Main.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      ago: PropTypes.string,
      user: PropTypes.string,
      comments_count: PropTypes.number,
      id: PropTypes.number,
      points: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string
    })
  ),
  changeQuery: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
};

export default Main;
