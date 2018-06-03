import React from 'react';
import PropTypes from 'prop-types';

const cleanString = str => {
  if (str) {
    return str
      .replace(/&#x2F;/g, '/')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/<[^>]*>/g, '');
  }
};
const CommentBlock = ({ comment, nested }) => {
  console.log(comment);
  return (
    <div className={`comment nested-${nested}`}>
      <ul>
        <li className="user"> {comment.user} </li> <li> {comment.time_ago} </li>{' '}
      </ul>
      {cleanString(comment.content)}
    </div>
  );
};
CommentBlock.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    time_ago: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
  }),
  nested: PropTypes.number.isRequired
};
export default CommentBlock;
