import React from 'react';
import { Link } from 'react-router';

const CommentBox = React.createClass({

  render() {
    return (
      <div className="comment-box">
        <p className="label">评论（部分HTML标签可用）</p>
        <textarea className="form-text msg"></textarea>
        <p className="label">您的昵称<span className="important">*</span>：</p>
        <input className="form-text" name="nickname" placeholder="必填" />
        <p className="label">Email<span className="important">*</span>：</p>
        <input className="form-text" name="email" placeholder="必填，不公开" />
        <p className="label">个人网址：</p>
        <input className="form-text" name="nickname" placeholder="我信任你，不会填写广告链接" />
        <p className="remember">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" checked="true"/>
            <span>记住个人信息</span>
          </label>
        </p>
        <button className="submit">发表</button>
      </div>
    )
  }

});

export default CommentBox;