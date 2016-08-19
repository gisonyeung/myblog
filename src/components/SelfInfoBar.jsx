import React from 'react';
import { Link } from 'react-router';
import Summation from './Summation';
import SubModal from './SubModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/Sidebar.scss');

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
        <img src="/static/img/myhead.jpg" alt="我的头像" className="myhead"/>
        <h2 className="nickname">
          <Link to="/about" title="关于我">杨子聪</Link>
        </h2>
        <p className="introduction">广东工业大学软件工程在读学生。15年开始学习前端，对架构和开发都很感兴趣。<br/>工作时有强迫症。</p>
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
            Github
          </li>
          <li>
            <span className="icon icon-disc"></span>
            Lofter
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