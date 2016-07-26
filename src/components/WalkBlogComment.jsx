import React from 'react';
import { Link } from 'react-router';


const  WalkBlogComment = React.createClass({

  render() {
    return (
      <div className="wbcm-item">
        <div className="wbcm-detail">
          <span className="name">点仓丶</span>
          <span className="grey">回复了</span>
          <span className="name">卢卡卡：</span>
          <span>看起来好平！</span>
        </div>
        <div className="wbcm-handle">
          <span className="wbcm-time">2016-07-24 13:24</span>
          <span className="reply">回复</span>
        </div>
      </div>      
    )
  }

});

export default WalkBlogComment;