import React, { Component } from 'react';
import hnApi from '../network/api';
import Comment from '../components/Comment';

class Comments extends Component {
  state = { commentsData: { comments: [] } };
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

  renderComments(comments) {
    if (comments && comments.length > 0) {
      return (
        <div>
          {comments.map((ele, key) => <Comment data={ele} key={key} />)}
        </div>
      );
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
          {this.renderComments(this.state.commentsData.comments)}
        </div>
      </div>
    );
  }
}
export default Comments;
