import React from 'react';
import { Router, Link, Route, browserHistory } from 'react-router';
import Summation from './Summation';
require('../sass/sidebar.scss');

const myhead = require('../img/myhead.jpg')

const SelfInfoBar = React.createClass({

  render() {
    return (
      <div className="self-sidebar ">
        <img src={myhead} alt="我的头像" className="myhead"/>
        <h2 className="nickname">
          <Link to="/about" title="关于我">二点零</Link>
        </h2>
        <p className="introduction">个人介绍个人介绍，这是个人谢谢支持个人介绍个人介绍，这是个人这是个人谢谢支持个谢谢支持啊</p>
        <p className="github">
          <span className="icon icon-github"></span>
          <a href="https://github.com/gisonyeung" target="_blank" title="我的Github">https://github.com/gisonyeung</a>
        </p>
        <a href="javascript:;" className="bookme">
          <span className="icon icon-mail"></span>
          <em>订阅我</em>
        </a>
        <Summation />
        <ul className="link">
          <li><Link to="/about" className="active">我的简介</Link></li>
          <li><a href="#">微博</a></li>
          <li><a href="#">Lofter</a></li>
        </ul>
      </div>
    )
  }

});

export default SelfInfoBar;