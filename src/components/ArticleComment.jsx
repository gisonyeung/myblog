import React from 'react';
import { Link } from 'react-router';
import Comment from './Comment';
import CommentBox from './CommentBox';

const ArticleComment = React.createClass({

  render() {
    return (
      <div className="comment-panel shadow-1">
        <h1 className="panel-title">留言（4）</h1>
        <div className="comments-list">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <CommentBox />
      </div>
    )
  }

});

export default ArticleComment;