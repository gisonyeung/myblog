import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import WalkingBlogAction from '../actions/WalkingBlogAction';
import WalkingBlogStore from '../stores/WalkingBlogStore';

const  WalkBlogComment = React.createClass({

  handleReply() {


    let data = {
      nickname: this.props.nickname,
      email: this.props.email,
      website: this.props.website,
      content: this.props.content,
      time: this.props.time,
    };

    WalkingBlogAction.replyComment(data);
  },

  render() {

    const that = this;

    let reply, name;

    // if ( this.props.replyTo.email && this.props.replyTo.email !== this.props.email) {
    if ( this.props.replyTo.email ) {

      reply = <span className="grey">回复了</span>;

      if ( this.props.replyTo.website ) {
        name = <a href={this.props.replyTo.website} className="name" target="_black">{this.props.replyTo.nickname}</a>;
      } else {
        name = <span className="name">{this.props.replyTo.nickname}</span>;
      }

    } else {
      reply = '';
      name = '';
    }


    let content = {
      __html: that.props.content.replace(/\n+/g, '\n').replace(/\n/g, '<br/>')
    }

    return (
      <div className="wbcm-item">
        <div className="wbcm-detail">
          {
            this.props.website ? 
            <a href={this.props.website} className="name" target="_black">{this.props.nickname}</a>
            :
            <span className="name">{this.props.nickname}</span>
          }
          {reply}
          {name}
          <span>：</span>
          <span dangerouslySetInnerHTML={content}/>
        </div>
        <div className="wbcm-handle">
          <span className="wbcm-time">{dateFormat(this.props.time, 'YYYY-MM-DD hh:mm')}</span>
          <span className="reply" onClick={this.handleReply}>回复</span>
        </div>
      </div>      
    )
  }

});

export default WalkBlogComment;