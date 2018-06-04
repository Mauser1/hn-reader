import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentBlock from './CommentBlock';

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

class Comment extends Component {
  constructor() {
    super();
    this.element = [];
  }
  static propTypes = { data: PropTypes.object.isRequired };
  renderComment({ comment, nested }) {
    return (
      <div className="comment">
        <ul>
          <li className="user"> {comment.user} </li>{' '}
          <li> {comment.time_ago} </li>{' '}
        </ul>
        {cleanString(comment.content)}
      </div>
    );
  }
  renderChildren(data, nested = 1) {
    if (data.comments) {
      data.comments.forEach((comment, index) => {
        this.element.push(<CommentBlock comment={comment} nested={nested} />);
        this.renderChildren(comment, index + 2);
      });
    }
  }
  renderComponent(data) {
    this.element = [<CommentBlock comment={data} />];
    this.renderChildren(data);
    return this.element;
  }

  render() {
    return <div>{this.renderComponent(this.props.data)}</div>;
  }
}
export default Comment;
