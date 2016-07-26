import React from 'react';
import { Link } from 'react-router';
import WalkBlogComment from './WalkBlogComment';


const  WalkBlogCommentBox = React.createClass({

  render() {
    return (
      <article className="box-wrap">
        <div className="walk-content">
          <div className="cont-top">
            <div className="cont-wrap wbcm">
              <h3 className="wb-title">评论(5)</h3>
              <div className="clearfix">
                <textarea className="form-text msg" />
                <button className="submit">发表</button>
              </div>
              <div className="wbcm-list">
                <WalkBlogComment />
                <WalkBlogComment />
                <WalkBlogComment />
                <WalkBlogComment />
                <WalkBlogComment />
                <WalkBlogComment />
                <WalkBlogComment />
              </div>
            </div>
          </div>
        </div>
        <div className="cont-bot">
          <div className="cont-bot-r">
            <div className="cont-bot-m">
              <div className="cont-bot-sl"></div>
              <div className="cont-bot-sr"></div>
            </div>
          </div>
        </div>
      </article>
    )
  }

});

export default WalkBlogCommentBox;