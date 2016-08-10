import React from 'react';
import { Router, Link, Route, browserHistory } from 'react-router';
import Summation from './Summation';
import SiteAction from '../actions/SiteAction';
import SiteStore from '../stores/SiteStore';


const SubModal = React.createClass({

  getInitialState() {
    return {
      isTip: {
        status: false,
        type: 'error', // 'error' or 'success'
        text: '',
      },
      hasSub: false,
    };
  },

  componentDidMount() {
    SiteStore.addChangeListener('SUBSCRIBE_BLOG', this.updateSubStatus);  
  },

  componentWillUnmount() {
    SiteStore.removeChangeListener('SUBSCRIBE_BLOG', this.updateSubStatus);   
  },

  updateSubStatus(data) {
  	this.handleTip(data.result, data.reason);
  },

  handleSub() {

    let formData = {
      nickname: this.refs.subNickname.value,
      email: this.refs.subEmail.value,
    };


    /* 表单验证 */
	if ( !/\S/.test(formData.nickname) ) {

	  this.handleTip('error', '昵称不能为空');
	  this.refs.subNickname.focus();
	  return false;

	} else if ( !/\S/.test(formData.email) ) {

      this.handleTip('error', '邮箱不能为空');
      this.refs.subEmail.focus();
      return false;

	} else if ( formData.nickname.length > 20 ) {

	  this.handleTip('error', '昵称过长');
	  this.refs.subNickname.focus();
	  return false;

	} else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {

	  this.handleTip('error', '电子邮箱格式错误');
	  this.refs.subEmail.focus();
	  return false;

	} else if ( formData.email.length > 50 ) {

	  this.handleTip('error', '邮箱过长');
	  this.refs.subEmail.focus();
	  return false;

	}

	SiteAction.subBlog(formData);

  },

  handleTip(type, text) {

    this.setState({
      isTip: {
        status: true,
        type: type,
        text: text,
      },
      hasSub: type == 'success' ? true : false,
    });
  },

  clearTip() {
    this.setState({
      isTip: {
        status: false,
        type: 'error',
        text: '',
      },
      hasSub: false,
    });
  },

  clickPanel(e) {
  	e.stopPropagation();
  },

  handleKeyUp(e) {
  	// 回车
  	if( e.which == 13 ) {
  		this.handleSub();
  	}
  },

  render() {

  	return (
  	  <div
  	    className="modal modal-sub"
  	    onClick={this.props.hideModal}
  	  >
        <div className="mask"></div>
        <div
          className="panel"
          onClick={this.clickPanel}
        >
          <h2>欢迎订阅</h2>
          <div className="m-middle">
            <input
              type="text" 
              className="text" 
              placeholder="昵称" 
              name="nickname"
              ref="subNickname"
              onKeyUp={this.handleKeyUp}
            />
            <input 
              type="email" 
              className="text" 
              placeholder="常用邮箱" 
              name="email"
              ref="subEmail"
              onKeyUp={this.handleKeyUp}
            />
            {
              this.state.hasSub ? 
              <span
	            className="btn success"
	          >✔ 已订阅</span>
	          :
	          <button
                className="btn"
                onClick={this.handleSub}
              >订&nbsp;&nbsp;阅</button>
            }
          </div>
          <div className="m-bottom">
            {
              this.state.isTip.status ? 
              <p className="error-tip">
                <span className={`icon ${this.state.isTip.type == 'error' ? 'icon-error' : 'icon-ok'}`}></span>
                <span className={`text ${this.state.isTip.type == 'error' ? '' : 'success'}`}>{this.state.isTip.text}</span>
              </p>
              :
              <div>
                <p>当有新博文发表时，将会以邮件形式通知您。</p>
                <p>所填信息不会被公开。</p>
              </div>
            }
          </div>
        </div>
      </div>
  	);

  }

});

export default SubModal;