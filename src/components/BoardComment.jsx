import React from 'react';
import { Link } from 'react-router';
import Comment from './Comment';
import BoardCommentBox from './BoardCommentBox';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const BoardComment = React.createClass({

  getInitialState() {

    // BlogAction.fetchBoardComments();

    return {
      isLoadMoreShow: false,
      record: BlogStore.getBoardRecord(),
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
      isLoadMoreShow: true,
      comments: BlogStore.getBoardComments(),
      record: BlogStore.getBoardRecord(),
    });
    
  },

  // 点击按钮，则先隐藏按钮，并发出请求
  loadMoreComments() {

    BlogAction.fetchBoardComments_more();
    this.setState({
      isLoadMoreShow: false,
    });
  },

  render() {
    const allCount = this.state.record.allCount;

    return (
      <div className="article-main">
        <div className="comment-panel shadow-1" id="comment">
          <h1 className="panel-title">留言板{ this.state.record.allCount ? '(' + this.state.record.allCount + ')' : ''}<span className="emoji">🌼</span></h1>
          <div className="comments-list">
            <ReactCSSTransitionGroup
              transitionName="blogitem" 
              transitionEnterTimeout={400}
              transitionLeaveTimeout={300}
            >
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
                    floor={allCount - index}
                  />
                )
              })
            }
            </ReactCSSTransitionGroup>
            {
              this.state.record.index == this.state.record.allCount || !this.state.isLoadMoreShow ? 
              ""
              :
              <p 
                className="loadmore"
                onClick={this.loadMoreComments}
              ><span>加载更多</span>s<span className="icon icon-loadmor"></span></p>
            }
            
          </div>
          <BoardCommentBox/>
        </div>
      </div>
    )
  }

});

export default BoardComment;