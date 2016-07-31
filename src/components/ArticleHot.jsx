import React from 'react';
import { Link } from 'react-router';

const ArticleHot = React.createClass({

  render() {
    return (
      <div className="atc-hot">
        <div className="widget">
          <span className="icon icon-like"></span>
          <p>点赞{
            this.props.numbers.like ? '(' + this.props.numbers.like + ')' : ''}</p>
        </div>
        <div className="widget">
          <span className="icon icon-share"></span>
          <p>分享</p>
        </div>
      </div>
    )
  }

});

export default ArticleHot;