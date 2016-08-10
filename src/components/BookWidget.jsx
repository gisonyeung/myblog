import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import ls from '../utils/localStorage';
import BookAction from '../actions/BookAction';
import BookStore from '../stores/BookStore';

const photo = require('../img/photo-demo2.jpg');

const BookWidget = React.createClass({
  

  getInitialState() {

    // 获取localStorage中点赞列表是否有此书本
    let BookLike = ls.get('BookLike');
    let isLike = false;

    // 存在此键，则isLike设为true
    if( BookLike[this.props.bookId] ) {
      isLike = true;
    }

    return {
        isLike: isLike,  
        recommend: this.props.recommend,
    };
  },

  addLike() {
    // 点赞开关
    if( !this.state.isLike ) {

      // 转换状态
      this.setState({
        isLike: true,
        recommend: this.state.recommend + 1,
      });

      BookAction.addLike(this.props.bookId);
    }
  },

  render() {

    const that = this;

    let description = {
      __html: that.props.description.replace(/\n+/g, '\n').replace(/\n/g, '<br/>'),
    }

    return (
      <div className="book-widget">
        <div className="wrap">
          <img src={photo}/>
        </div>
        <div className="text">
          <h3 className="book-name">
            <span>{this.props.name}</span>
            
          </h3>
          <div className="introduction" dangerouslySetInnerHTML={description} />
        </div>
        <div className="foot">
          <span className="time" title={dateFormat(this.props.time, 'YYYY-DD-MM hh:mm')}>添入时间：{dateFormat(this.props.time, 'YYYY-DD-MM')}</span>
          <span 
            className={`recommend ${this.state.isLike ? 'on' : ''}`}
            onClick={this.addLike}
          >{this.state.isLike ? '已荐' : '推荐'}{this.state.recommend ? '(' + this.state.recommend + ')' : ''}</span>
        </div>
      </div>
    )
  }

});

export default BookWidget;