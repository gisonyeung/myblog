import React from 'react';
import { Link } from 'react-router';
import WalkBlog from './WalkBlog';
import WalkBlogCommentBox from './WalkBlogCommentBox';


const  WalkBlogDetail = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
        <div className="life-wrap">
          <WalkBlog />
          <WalkBlogCommentBox />
          <div className="wbcm-page clearfix">
            <Link to="/mylife/1" className="prev"><span>«</span>上一篇</Link>
            <Link to="/mylife/1" className="next">下一篇<span>»</span></Link>
          </div>
        </div>
      </div>
    )
  }

});

export default WalkBlogDetail;