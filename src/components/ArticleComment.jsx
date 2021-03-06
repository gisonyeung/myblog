import React from 'react';
import { Link } from 'react-router';
import Comment from './Comment';
import CommentBox from './CommentBox';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';

const ArticleComment = React.createClass({

  getInitialState() {
      BlogAction.fetchBlogComment(this.props.blogId);
    
      return {
          comments: BlogStore.getComments(), 
      };
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.blogId == this.props.blogId && this.props.blogId != -1) {
      return false;
    }
    // 换成异步的时候，移至WillReceiveProps
    BlogAction.fetchBlogComment(nextProps.blogId);
  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_COMMENT', this.updateComments);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BLOG_COMMENT', this.updateComments)  

  },

  updateComments() {

    this.setState({
      comments: BlogStore.getComments()
    });
    
  },

  render() {
    const comments_length = this.state.comments.length;
    return (
      <div className="comment-panel shadow-1" id="comment">
        <h1 className="panel-title">留言{ this.state.comments.length ? '(' + this.state.comments.length + ')' : ''}</h1>
        <div className="comments-list">
          {
            this.state.comments.map(function(comment, index) {
              return (
                <Comment 
                  key={comment._id}
                  nickname={comment.user.nickname}
                  website={comment.user.website}
                  email={comment.user.email}
                  time={comment.time}
                  content={comment.content}
                  floor={comments_length - index}
                />
              )
            })
          }
        </div>
        <CommentBox blogId={this.props.blogId} />
      </div>
    )
  }

});

export default ArticleComment;