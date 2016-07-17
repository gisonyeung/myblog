import React from 'react';
import { Link } from 'react-router';

require('../sass/HomeBlogItem.scss');

const HomeBlogItem = React.createClass({

  render() {
    return (
      <article className="blog-item shadow-1">
        <h1 className="title" title="查看全文">
          <Link to="/">函数式编程柯里化</Link>
          <div className="border" />
        </h1>
        <div className="subtitle">
          <span>
            <i className="icon icon-time" title="发表时间"></i>
            <time>2016-06-23</time>
          </span>
          <span>
            <i className="icon icon-update" title="最后更新时间"></i>
            <time>2016-06-23</time>
          </span>
          <Link to="/" title="分类">JS杂谈</Link>
        </div>
        <p className="summary">JS是一门函数式编程语言，其中具有一个很明显的特点就是: 函数是"第一等公民",也就是说函数跟数值，字符串，对象等数据类型一样，函数也是JS的一种数据类型。 这点在下面的代码体现非常明显：123456Function. ...</p>
        <footer className="details clearfix">
          <div className="tags">
            <span className="icon icon-tag" title="标签"></span>
            <ul className="tags-list">
              <li><Link to="/">JavaScript</Link></li>
              <li><Link to="/">算法</Link></li>
              <li><Link to="/">函数式编程</Link></li>
            </ul>
          </div>
          <div className="summation">
            <span>阅读(321)</span>
            <span>评论</span>
            <Link to="/" className="article-link" title="查看全文">全文链接 »</Link>
          </div>
        </footer>
      </article>
    )
  }

});

export default HomeBlogItem;