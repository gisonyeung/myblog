import React from 'react';
import { Link } from 'react-router';


const Category = React.createClass({


  render() {
    return (
      <div className="category-panel">
        <h2 className="title">分类</h2>
        <ul className="cate-list">
          <li className="cate-item">
            <Link to="/">HTML&CSS</Link>
            <span className="number">（325）</span>
          </li>
          <li className="cate-item">
            <Link to="/">Javascript</Link>
            <span className="number">（120）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
          <li className="cate-item">
            <Link to="/">性能优化</Link>
            <span className="number">（32）</span>
          </li>
        </ul>
      </div>
    )
  }

});

export default Category;