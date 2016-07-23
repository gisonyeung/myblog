import React from 'react';
import { Link } from 'react-router';

const Comment = React.createClass({

  render() {
    return (
      <div className="comment">
        <div className="cm-top clearfix">
          <p className="info">
            <span className="name">小明他姐</span>
            <span className="time">2016-06-25 22:43</span>
          </p>
          <p className="handle">
            <span className="quote">引用</span>
            <span className="floor">1楼</span>
          </p>
        </div>
        <div className="cm-content">
          <p>看不懂图表什么情况 为什么两个柱状图上下排列 分别代表什么 为什 分别代表什么 为什 分别代表什么 为什么还有—1%的</p>
        </div>
      </div>
    )
  }

});

export default Comment;