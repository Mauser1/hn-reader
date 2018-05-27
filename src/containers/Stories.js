import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from '../components/Story';

class Stories extends Component {
  renderLoading = () => <div>Loading ...</div>;
  renderStories() {
    return (
      <ol>
        {this.props.stories.map((story, index) => (
          <Story story={story} index={index + 1} />
        ))}
      </ol>
    );
  }
  render() {
    if (!this.props.stories) {
      return this.renderLoading();
    }
    return this.renderStories();
  }
}

Stories.defaultProps = {
  stories: null
};

Stories.propTypes = {
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
  )
};

export default Stories;
