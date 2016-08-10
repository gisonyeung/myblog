import React from 'react';
import { Router, Link, Route, browserHistory } from 'react-router';
import Summation from './Summation';
import SubModal from './SubModal';
import SiteAction from '../actions/SiteAction';
import SiteStore from '../stores/SiteStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/Sidebar.scss');

const myhead = require('../img/myhead.jpg')

const SelfInfoBar = React.createClass({

  getInitialState() {

    return {
      isSubModal: false,
    };

  },

  showSubModal() {
    this.setState({
      isSubModal: true,
    });
  },

  hideModal() {
    this.setState({
      isSubModal: false,
    });
  },

  render() {
    return (
      <div className="self-sidebar shadow-1">
        <img src={myhead} alt="我的头像" className="myhead"/>
        <h2 className="nickname">
          <Link to="/about" title="关于我">杨子聪</Link>
        </h2>
        <p className="introduction">广东工业大学软件工程在读学生。15年开始学习前端，对网页架构和开发同样感兴趣。有设计基础，平常有收集设计素材的习惯。</p>
        <p className="github">
          <span className="icon icon-github"></span>
          <a href="https://github.com/gisonyeung" target="_blank" title="我的Github">https://github.com/gisonyeung</a>
        </p>
        <a 
          href="javascript:;" 
          className="bookme"  
          onClick={this.showSubModal}
        >
          <span className="icon icon-mail"></span>
          <em>订阅我</em>
        </a>
        <Summation />
        <ul className="link">
          <li>
            <span className="icon icon-disc"></span>
            <Link to="/about" className="active">我的简介</Link>
          </li>
          <li>
            <span className="icon icon-disc"></span>
            <a href="#">微博</a>
          </li>
          <li>
            <span className="icon icon-disc"></span>
            <a href="#">Lofter</a>
          </li>
        </ul>
        <ReactCSSTransitionGroup
          transitionName="dropdown" 
          transitionAppear={true} 
          transitionAppearTimeout={800}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
        {
          this.state.isSubModal ? 
          <SubModal
            hideModal={this.hideModal}
          />
          : 
          ''
        }
        </ReactCSSTransitionGroup>
      </div>
    )
  }

});

export default SelfInfoBar;