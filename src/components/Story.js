import React from 'react';
import PropTypes from 'prop-types';

const Story = props => (
  <div className="story">
    <div className="index">{props.index}</div>
    <h4>
      <a
        href={
          props.story.url ||
          `https://news.ycombinator.com/item?id=${props.story.id}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.story.title}
      </a>
    </h4>
    <ul>
      <li>
        <b>{props.story.points} points</b> by&nbsp;
        <a href={`https://news.ycombinator.com/user?id=${props.story.by}`}>
          {props.story.by}
        </a>
      </li>
      <li>{props.story.ago}</li>
      <li>
        <a
          href={`https://news.ycombinator.com/item?id=${props.story.id}`}
          target="_blank"
        >
          {props.story.commentCount}{' '}
          {props.story.commentCount === 1 ? 'Comment' : 'Comments'}
        </a>
      </li>
    </ul>
  </div>
);

Story.propTypes = {
  story: PropTypes.object.isRequired
};

export default Story;
