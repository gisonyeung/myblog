import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/HomeBlogItem.scss');

const HomeBlogItem = React.createClass({


  render() {

    let summary = {
      __html: this.props.summary.replace(/\n+/g, '<br/>'),
    };

    return (
      <article className="blog-item shadow-1">
        <h1 className="title" title="查看全文">
          <Link to={`/article/${this.props.id}`}>{this.props.title}</Link>
          <div className="border" />
        </h1>
        <div className="subtitle">
          <span>
            <i className="icon icon-time" title={`发表时间: ${dateFormat(this.props.createAt, "YYYY-MM-DD hh:mm:ss")}`}></i>
            <time>{dateFormat(this.props.createAt, "YYYY-MM-DD")}</time>
          </span>
          <span>
            <i className="icon icon-update" title={`最后更新时间: ${dateFormat(this.props.createAt, "YYYY-MM-DD hh:mm:ss")}`}></i>
            <time>{dateFormat(this.props.updateAt, "YYYY-MM-DD")}</time>
          </span>
          <Link to={`/archives?type=category&category=${this.props.category}`} title="分类">{this.props.category}</Link>
        </div>
        <p className="summary" dangerouslySetInnerHTML={summary} />
        <footer className="details clearfix">
          <div className="tags">
            <span className="icon icon-tag" title="标签"></span>
            <ul className="tags-list">
              {
                this.props.tags.split(',').map(function(tag, index) {
                  return (
                    <li key={index}><Link to={`/archives?type=tag&tag=${tag}`}>{tag}</Link></li>
                  )
                })
              }
            </ul>
          </div>
          <div className="summation">
            <span>阅读{this.props.numbers.view ? `(${this.props.numbers.view})` : ''}</span>
            <span>评论{this.props.numbers.comment ? `(${this.props.numbers.comment})` : ''}</span>
            <Link to={`/article/${this.props.id}`} className="article-link" title="查看全文">全文链接 »</Link>
          </div>
        </footer>
      </article>
    )
  }

});

export default HomeBlogItem;