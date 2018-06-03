import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hnApi from '../network/api';

const cleanString = str =>
  str
    .replace(/<[^>]*>/g, '')
    .replace('&amp;', '&')
    .replace('&quot;', '"');

const Comment = ({ comment, nested = 1 }) => (
  <div className={`comment nested-${nested}`}>
    <ul>
      <li>{comment.user}</li>
      <li>{comment.time_ago}</li>
    </ul>
    {cleanString(comment.content)}
  </div>
);
class Comments extends Component {
  constructor() {
    super();
    this.commentsToRender = [];
  }
  state = { commentsData: { comments: [] } };
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  componentDidMount() {
    const id = window.location.href.match(/([^\/]*)\/*$/)[1];
    hnApi
      .fetchItem(id)
      .then(result => {
        this.setState({ commentsData: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderComment(comment) {
    this.commentsToRender = [<Comment comment={comment} />];
    this.renderChildren(comment);
    return this.commentsToRender;
  }
  renderChildren(comments, nested = 1) {
    if (comments) {
      comments.forEach((comment, index) => {
        this.commentsToRender.push(<Comment comment={comment} />);
        this.renderChildren(comment, index + 2);
      });
    }
  }
  render() {
    return (
      <div className="comments">
        <ul header="comment-header">
          <li className="comment-title">{this.state.commentsData.title}</li>
          <li className="comment-domain">{this.state.commentsData.domain}</li>
        </ul>
        <ul className="comment-subheader">
          <li>
            <b>{this.state.commentsData.points} points</b>
          </li>
          <li>
            by <b>{this.state.commentsData.user}</b>
          </li>
          <li>{this.state.commentsData.time_ago}</li>
          <li>{this.state.commentsData.comments_count} comments</li>
        </ul>
        <div className="comments">
          {this.renderComment(this.state.commentsData.comments)}
        </div>
      </div>
    );
  }
}
export default Comments;
