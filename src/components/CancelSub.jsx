import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SiteAction from '../actions/SiteAction';
import SiteStore from '../stores/SiteStore';

require('../sass/CancelSub.scss');

const CancelSub = React.createClass({

  getInitialState() {
    return {
      nextStep: false,
      isTip: {
        status: false,
        type: 'error', // 'error' or 'success'
        text: '',
      },
      btn: {
        type: 'success',
        text: '发送验证码至邮箱',
      },
    };
  },

  componentDidMount() {
    SiteStore.addChangeListener('SITE_SEND_CODE', this.updateStep);  
    SiteStore.addChangeListener('SITE_CANCEL_SUB', this.updateResult);  
  },

  componentWillUnmount() {
    SiteStore.removeChangeListener('SITE_SEND_CODE', this.updateStep);      
    SiteStore.removeChangeListener('SITE_CANCEL_SUB', this.updateResult);      
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
      nextStep: false,
      
    });
  },

  sendEmail() {

    var email = this.refs.email.value;

    if ( !/\S/.test(email) ) {
      this.setState({
        btn: {
          type: 'error',
          text: '邮箱不能为空',
        },
      });
      return false;
    } else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(email) ) {
      this.setState({
        btn: {
          type: 'error',
          text: '邮箱格式错误',
        },
      });
      return false;
    }

    SiteAction.sendCode(email);

    

  },

  defaultBtn(e) {

    if ( e.which == 13 ) {

      this.sendEmail();

    } else {

      this.setState({
        btn: {
          type: 'success',
          text: '发送验证码至邮箱',
        },
      });

    }

  },

  handleConfirm() {

    var email = this.refs.email.value;
    var id = this.refs.code.value;

    if ( !/\S/.test(email) ) {
      return false;
    } else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(email) ) {
      return false;
    } else if ( !/\S/.test(id) ) {
      return false;
    }

    SiteAction.cancelSub(email, id);

  },

  updateStep(data) {
    if ( data.result == 'success' ) {
      this.setState({
        nextStep: true,
      });
    } else {
      this.setState({
        btnValue: data.reason,
      });
    }
  },

  updateResult(data) {

    this.handleTip(data.result, data.reason);

  },


  render() {
    return (
      <div className="inner-wrapper">
        <div className="cs">
        <ReactCSSTransitionGroup
          transitionName="blogitem"
          transitionAppear={true} 
          transitionLeave={false} 
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
        >
        {
          this.state.isTip.status ? 
          ''
          :
          <div className ="cs-part" key="1">
            <h2 className="title">退订服务</h2>
            <div className="cont">
              <input
                type="text" 
                className="text" 
                placeholder="请输入您订阅所用的邮箱" 
                name="email"
                ref="email"
                onKeyUp={this.defaultBtn}
              />
              {
                this.state.nextStep ? 
                <input
                  type="text" 
                  className="text" 
                  placeholder="验证码" 
                  ref="code"
                />
                :
                ''
              }
              {
                this.state.nextStep ? 
                <button
                  className="btn"
                  onClick={this.handleConfirm}
                >确认退订</button>
                :
                <button
                  className={`btn ${this.state.btn.type == 'error' ? 'error' : ''}`}
                  onClick={this.sendEmail}
                >{this.state.btn.text}</button>
              }
              

            </div>
          </div>
        }
        {
          this.state.isTip.status ?
          <div className="cs-part" key="2">
            <div className={`tip ${this.state.isTip.type}`}>
              <p>
                <span className="emoji">{this.state.isTip.type == 'success' ? '✔' : '✖'}</span>
                {this.state.isTip.text}
              </p>
              <p><a href="javascript:;" onClick={this.clearTip}>返回上一级</a></p>
            </div>
          </div>
          : 
          ''
        } 
        </ReactCSSTransitionGroup>


        </div>
        
        
      </div>
    )
  }

});

export default CancelSub;