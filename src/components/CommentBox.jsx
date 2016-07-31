import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';

const CommentBox = React.createClass({

  getInitialState() {

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
      isError: {
        status: false,
        text: '',
      },
      cookieForm: cookieForm,
    };
  },

  componentDidMount() {

    BlogStore.addChangeListener('SEND_COMMENT', this.sendCall);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('SEND_COMMENT', this.sendCall)  

  },

  handleFocus() {
    if( !this.state.isOn ) {
      this.setState({
        isOpen: true
      });
    }
  },

  handleClick() {

    const that = this;

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
    if ( !/\S/.test(formData.content) ) {
      this.handleError('评论内容不能为空');
      this.refs.content.focus();
      return false;
    } else if ( !/\S/.test(formData.nickname) ) {
      this.handleError('昵称不能为空');
      this.refs.nickname.focus();
      return false;
    } else if ( !/\S/.test(formData.email) ) {
      this.handleError('电子邮箱不能为空');
      this.refs.email.focus();
      return false;
    } else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {
      this.handleError('电子邮箱格式错误');
      this.refs.email.focus();
      return false;
    }
    /*
      个人网站不为空时，检测有无https?://前缀，无则添加http://
    */
    if ( /\S/.test(formData.website) ) {
      formData.website = formData.website.replace(/^(https?:\/\/)?.*/, function(match, capture) {
        // 有捕获组，已有前缀
        if ( capture ) {
          return match;
        } else {
          return 'http://' + match;
        }
      });
    }


    // 记住个人信息，存储进cookie => nickname, email, website
    if ( this.refs.remember.checked ) {
      cookie.save('nickname', formData.nickname, { path: '/' });
      cookie.save('email', formData.email, { path: '/' });
      cookie.save('website', formData.website, { path: '/' });
    } else {
      // 删除对应cookie
      cookie.remove('nickname', { path: '/' });
      cookie.remove('email', { path: '/' });
      cookie.remove('website', { path: '/' });
    }
    
    this.clearError();

    BlogAction.sendComment(formData);

  },

  handleError(text) {
    this.setState({
      isError: {
        status: true,
        text: text,
      },
    });
  },

  clearError() {
    this.setState({
      isError: {
        status: false,
        text: '',
      },
    });
  },

  sendCall(reason) {
    if( reason ) {
      handleError(reason);
    } else {
      location.reload();
    }
  },



  render() {
    return (
      <div className="comment-box">
        <p className="label">评论（部分HTML标签可用）</p>
        <textarea 
          className={`form-text msg ${this.state.isOpen ? 'on' : ''}`}
          onFocus={this.handleFocus}
          ref="content"
        />
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
        <p className="remember">
          <label htmlFor="remember">
            <input 
              type="checkbox" 
              id="remember" 
              defaultChecked={this.state.isChecked}
              ref="remember"
            />
            <span>记住个人信息</span>
          </label>
        </p>
        {
          this.state.isError.status ? 
          <p className="error-tip">
            <span className="icon icon-error"></span>
            <span className="text">{this.state.isError.text}</span>
          </p>
          : 
          ''
        }
        
        <button 
          className="submit"
          onClick={this.handleClick}
        >发表</button>
      </div>
    )
  }

});

export default CommentBox;