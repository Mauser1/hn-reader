import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "../components/Story";

class Stories extends Component {
  renderLoading = () => <div>Loading ...</div>;
  renderStories() {
    return this.props.stories.map(story => <Story story={story} />);
  }
  render() {
    console.log(this.props.stories);
    if (!this.props.stories) {
      return this.renderLoading();
    }
    return this.renderStories();
  }
}

Stories.propTypes = {
  stories: PropTypes.array
};
export default Stories;
