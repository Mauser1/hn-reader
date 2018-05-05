import React from 'react';
import PropTypes from 'prop-types';

const Story = props => (
  <div className="story" key={props.story.id}>
    <div className="index">{props.index}</div>
    <div className="content">
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
  </div>
);

Story.propTypes = {
  story: PropTypes.shape({
    ago: PropTypes.string,
    by: PropTypes.string,
    commentCount: PropTypes.number,
    id: PropTypes.number,
    points: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default Story;
