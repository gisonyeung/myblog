import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import BlogAction from '../actions/BlogAction';
import parseComment from '../utils/parseComment';

const Comment = React.createClass({

  handleQuote() {
    BlogAction.quoteComment({
      email: this.props.email,
      time: this.props.time,
      nickname: this.props.nickname,
      content: this.props.content.replace(/\n+/g, '<br/>'),
    });
  },

  render() {
    parseComment(this.props.content);
    return (
      <div className="comment">
        <div className="cm-top clearfix">
          <p className="info">
            {
              this.props.website ? 
              <a href={this.props.website} className="name" target="_blank">{this.props.nickname}</a>
              :
              <span className="name">{this.props.nickname}</span>
            }
            <span className="time">{dateFormat(this.props.time, "YYYY-MM-DD hh:mm:ss")}</span>
          </p>
          <p className="handle">
            <span className="quote" onClick={this.handleQuote} title="当您引用对方评论时，系统将会通过邮件通知对方">引用</span>
            <span className="floor">{this.props.floor}楼</span>
          </p>
        </div>
        <div className="cm-content" dangerouslySetInnerHTML={parseComment(this.props.content)} />
      </div>
    )
  }

});

export default Comment;