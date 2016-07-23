import React from 'react';
import { Link } from 'react-router';

const photo = require('../img/photo-demo2.jpg');

const BookWidget = React.createClass({

  render() {
    return (
      <div className="book-widget">
        <div className="wrap">
          <img src={photo}/>
        </div>
        <div className="text">
          <h3 className="book-name">
            <span>Javascript高级程序设计</span>
            
          </h3>
          <div className="introduction">
            夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。
            <br/>
            南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM
          </div>
        </div>
        <div className="foot">
          <span className="time">添入时间：2016-07-23</span>
          <span className="recommend">推荐(24)</span>
        </div>
      </div>
    )
  }

});

export default BookWidget;