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
        <p className="introduction">2018届广东工业大学软件工程毕业生<br/>现就职于腾讯（深圳）</p>
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

        <ReactCSSTransitionGroup
          transitionName="fold"
          transitionAppear={true}
          transitionAppearTimeout={800}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
        {
          this.props.simpleMode ? '' : <Summation />
        }
        {
          this.props.simpleMode ? '' :
          <ul className="link">
            <li>
              <span className="icon icon-disc"></span>
              <Link to="/about" className="active">我的简介</Link>
            </li>
            <li>
              <span className="icon icon-disc"></span>
              <a href="/other/html/algorithms.html" target="_blank">算法分析</a>
            </li>
            <li>
              <span className="icon icon-disc"></span>
              <a href="javascript:;" className="has-panel">公众号</a>
              <div className="panel">
                <img src="/static/img/qrcode.jpg" />
              </div>
            </li>
          </ul>
        }
        </ReactCSSTransitionGroup>

        
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