import React from 'react';
import { Link } from 'react-router';

const photo = require('../img/photo-demo2.jpg');

const BookPanel = React.createClass({

  render() {
    return (
      <article className="book-panel">
        <h2 className="book-name">Javascript 高级程序设计(第三版)</h2>
        <p className="price">
          <span>纸书价格：￥65.5</span>
          <span>电子书价格：￥23.3</span>
        </p>
        <p className="description">前端开发人员案头必备书之一，<br/>深入浅出讲解了Javascript原理及技巧。</p>
        <div className="star">
          <p className="key">推荐指数</p>
          <p className="value">★★★★☆</p>
        </div>
        <div className="photo shadow-1">
          <img src={photo}/>
        </div>
      </article>
    )
  }

});

export default BookPanel;