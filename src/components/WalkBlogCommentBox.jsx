import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import WalkBlogComment from './WalkBlogComment';
import WalkingBlogAction from '../actions/WalkingBlogAction';
import WalkingBlogStore from '../stores/WalkingBlogStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



const  WalkBlogCommentBox = React.createClass({

  getInitialState() {

    // 请求博文内容
    WalkingBlogAction.fetchBlogComment(this.props.blogId);

    /*
      读取个人信息cookie
    */
    let cookieForm = {
      nickname: cookie.load('nickname'),
      email: cookie.load('email') || '',
      website: cookie.load('website'),
    }

    let isChecked = false;

    if( /\S/.test(cookieForm.email) ) {
      // 打勾
      isChecked = true;

    };

    return {
      isChecked: isChecked,
      isOpen: false,
      isSend: false,
      isTip: {
        status: false,
        type: 'error', // 'error' or 'success'
        text: '',
      },
      cookieForm: cookieForm,
      comments: WalkingBlogStore.getComments(),
    };

  },

  componentWillReceiveProps(nextProps) {
    if( nextProps.blogId == this.props.blogId) {
      return false;
    }
    // 换成异步的时候，移至WillReceiveProps
    WalkingBlogAction.fetchBlogComment(nextProps.blogId);
  },

  componentDidMount() {

    WalkingBlogStore.addChangeListener('SEND_COMMENT', this.sendCall);
    WalkingBlogStore.addChangeListener('BLOG_COMMENT', this.updateComments);
    WalkingBlogStore.addChangeListener('REPLY_COMMENT', this.replyComment);
    
  },

  componentWillUnmount() {

    WalkingBlogStore.removeChangeListener('SEND_COMMENT', this.sendCall)  
    WalkingBlogStore.removeChangeListener('BLOG_COMMENT', this.updateComments)  
    WalkingBlogStore.removeChangeListener('REPLY_COMMENT', this.replyComment)  

  },


  handleFocus() {
    if( !this.state.isOpen ) {
      this.setState({
        isOpen: true
      });
    }
  },

 updateComments() {
    this.setState({
      comments: WalkingBlogStore.getComments(),
    });
  },

  handleClick() {
    const that = this;

    // 未展开个人信息窗则展开
    if ( !this.state.isSend ) {
      this.clearTip();
      this.setState({
        isSend: true,
      });
      return false;
    }

    let formData = {
      blogId: that.props.blogId,
      nickname: that.refs.nickname.value,
      email: that.refs.email.value,
      content: that.refs.content.value,
      website: that.refs.website.value,
    }

    /*
      表单验证
    */
    if ( !/\S/.test(formData.content.replace(/<blockquote>[\s\S]*<\/blockquote>/g, '')) ) {
      this.handleTip('error', '评论内容不能为空');
      this.refs.content.focus();
      return false;
    } else if ( !/\S/.test(formData.nickname) ) {
      this.handleTip('error', '昵称不能为空');
      this.refs.nickname.focus();
      return false;
    } else if ( !/\S/.test(formData.email) ) {
      this.handleTip('error', '电子邮箱不能为空');
      this.refs.email.focus();
      return false;
    } else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {
      this.handleTip('error', '电子邮箱格式错误');
      this.refs.email.focus();
      return false;
    } else if ( formData.content.length > 1500 ) {
      this.handleTip('error', '评论内容过长');
      this.refs.content.focus();
      return false;
    } else if ( formData.nickname.length > 15 ) {
      this.handleTip('error', '昵称过长');
      this.refs.nickname.focus();
      return false;
    } else if ( formData.email.length > 50 ) {
      this.handleTip('error', '电子邮箱过长');
      this.refs.email.focus();
      return false;
    }  else if ( formData.website.length > 100 ) {
      this.handleTip('error', '个人网站过长');
      this.refs.website.focus();
      return false;
    }

    this.clearTip();

    WalkingBlogAction.sendComment(formData);
  },

  handleTip(type, text) {
    this.setState({
      isTip: {
        status: true,
        type: type,
        text: text,
      },
    });
  },

  clearTip() {
    this.setState({
      isTip: {
        status: false,
        type: 'error',
        text: '',
      },
    });
  },

  sendCall(reason) {
    if( reason ) {
      this.handleTip('error', reason);
    } else {
      this.refs.content.value = '';
      this.setState({
        isSend: false,
      })
      this.handleTip('success', '发表评论成功');
      this.refs.content.setAttribute('placeholder' ,'');
      WalkingBlogAction.cancelReply();
      WalkingBlogAction.fetchBlogComment(this.props.blogId);
    }
  },

  replyComment(data) {

    if ( !data.email ) {
      this.refs.content.setAttribute('placeholder' ,'');
    } else {
      this.refs.content.setAttribute('placeholder' ,'回复：' + data.nickname);
    }

    this.refs.content.focus();

  },

  handleKeyDown(e) {

    if ( e.keyCode == 8 && !this.refs.content.value ) {
      WalkingBlogAction.cancelReply();
    }

  },




  render() {

    let comments_length = this.state.comments.length;

    return (
      <article className="box-wrap">
        <div className="walk-content">
          <div className="cont-top">
            <div className="cont-wrap wbcm">
              <h3 className="wb-title">评论{this.state.comments.length ? '(' + this.state.comments.length + ')' : ''}</h3>
              <div className="clearfix">
                <textarea
                  className={`form-text msg ${this.state.isOpen ? 'on' : ''}`}
                  onFocus={this.handleFocus}
                  onKeyDown={this.handleKeyDown}
                  ref="content"
                />
                <div className="clearfix">
                  <button 
                    className="submit"
                    onClick={this.handleClick}

                  >发表</button>
                  {
                    this.state.isTip.status ? 
                    <p className="error-tip">
                      <span className={`icon ${this.state.isTip.type == 'error' ? 'icon-error' : 'icon-ok'}`}></span>
                      <span className={`text ${this.state.isTip.type == 'error' ? '' : 'success'}`}>{this.state.isTip.text}</span>
                    </p>
                    : 
                    ''
                  }
                </div>
                <ReactCSSTransitionGroup
                  transitionName="fold"
                  transitionAppear={true} 
                  transitionAppearTimeout={400}
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={300}
                >
                {
                  this.state.isSend ? 
                  <div className="wbcm-info">
                    <p className="label">您的昵称<span className="important">*</span>：</p>
                    <input
                      className="form-text"
                      name="nickname" 
                      placeholder="必填" 
                      ref="nickname"
                      defaultValue={this.state.cookieForm.nickname}
                    />
                    <p className="label">Email<span className="important">*</span>：</p>
                    <input 
                      className="form-text" 
                      name="email" 
                      placeholder="必填，不公开" 
                      ref="email"
                       defaultValue={this.state.cookieForm.email}
                    />
                    <p className="label">个人网址：</p>
                    <input 
                      className="form-text" 
                      name="website" 
                      placeholder="我信任你，不会填写广告链接"
                      ref="website"
                       defaultValue={this.state.cookieForm.website}
                    />
                  </div>
                  :
                  ''
                }
                </ReactCSSTransitionGroup>

              </div>
              <div className="wbcm-list">
              {
                this.state.comments.map(function(comment, index) {
                  return (
                    <WalkBlogComment
                      key={comment._id}
                      nickname={comment.user.nickname}
                      website={comment.user.website}
                      email={comment.user.email}
                      time={comment.time}
                      content={comment.content}
                      floor={comments_length - index} 
                      replyTo={comment.replyTo}
                    />
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
        <div className="cont-bot">
          <div className="cont-bot-r">
            <div className="cont-bot-m">
              <div className="cont-bot-sl"></div>
              <div className="cont-bot-sr"></div>
            </div>
          </div>
        </div>
      </article>
    )
  }

});

export default WalkBlogCommentBox;