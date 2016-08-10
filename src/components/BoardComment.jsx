import React from 'react';
import { Link } from 'react-router';
import Comment from './Comment';
import BoardCommentBox from './BoardCommentBox';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';

const BoardComment = React.createClass({

  getInitialState() {

    BlogAction.fetchBoardComments();

    return {
        comments: BlogStore.getBoardComments(), 
    };
  },

  componentDidMount() {

    BlogStore.addChangeListener('BOARD_COMMENT', this.updateComments);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BOARD_COMMENT', this.updateComments)  

  },

  updateComments() {

    this.setState({
      comments: BlogStore.getBoardComments(),
    });
    
  },

  render() {
    const comments_length = this.state.comments.length;
    return (
      <div className="article-main">
        <div className="comment-panel shadow-1" id="comment">
          <h1 className="panel-title">留言板{ this.state.comments.length ? '(' + this.state.comments.length + ')' : ''}<span className="emoji">🌼</span></h1>
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
          <BoardCommentBox/>
        </div>
      </div>
    )
  }

});

export default BoardComment;