import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';

const Comment = React.createClass({

  render() {
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
            <span className="quote">引用</span>
            <span className="floor">{this.props.floor}楼</span>
          </p>
        </div>
        <div className="cm-content">
          <p>{this.props.content}</p>
        </div>
      </div>
    )
  }

});

export default Comment;