import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Story = props => (
  <li className="story" key={props.story.id}>
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
          {props.story.user}
        </a>
      </li>
      <li>{props.story.time_ago}</li>
      <li>
        <Link to={`/${props.story.id}`}>
          {props.story.comments_count}{' '}
          {props.story.comments_count === 1 ? 'Comment' : 'Comments'}
        </Link>
      </li>
    </ul>
  </li>
);

Story.propTypes = {
  story: PropTypes.shape({
    ago: PropTypes.string,
    user: PropTypes.string,
    comments_count: PropTypes.number,
    id: PropTypes.number,
    points: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    time_ago: PropTypes.number,
    by: PropTypes.string
  }).isRequired
};

export default Story;
