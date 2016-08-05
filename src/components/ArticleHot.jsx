import React from 'react';
import { Link } from 'react-router';
import ls from '../utils/localStorage';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';

const ArticleHot = React.createClass({

  getInitialState() {

    

    return {
        isLike: false,  
        likeNum: this.props.numbers.like,
    };
  },

  componentWillReceiveProps(nextProps) {
      // 获取localStorage中点赞列表是否有此博文
      let BlogLike = ls.get('BlogLike');
      let isLike = false;

      // 存在此键，则isLike设为true
      if( BlogLike[nextProps.blogId] ) {
        isLike = true;
      }

      this.setState({
        isLike: isLike,
        likeNum: nextProps.numbers.like,
      });  
  },

  componentDidMount() {

    BlogStore.addChangeListener('REFRESH_LIKE', this.updateLike);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('REFRESH_LIKE', this.updateLike)  

  },

  addLike() {
    // 点赞开关
    if( !this.state.isLike ) {

      // 转换状态
      this.setState({
        isLike: true,
        likeNum: this.state.likeNum + 1,
      });

      BlogAction.addLike(this.props.blogId);
    }
  },

  // 存储进localStorage
  updateLike(reason) {

    // 成功，存进localStorage
    if ( !reason ) {

      let BlogLike = ls.get('BlogLike');
      BlogLike[this.props.blogId] = 1;
      ls.set('BlogLike', BlogLike);

    } else { // 失败，转换回原来状态

      this.setState({
        isLike: false,
        likeNum: this.state.likeNum - 1,
      });

    }
    
  },

  render() {
    return (
      <div className="atc-hot">
        <div className={`widget ${this.state.isLike ? 'active' : ''}`}>
          <span className="icon icon-like" onClick={this.addLike}></span>
          <p>点赞{
            this.state.likeNum ? '(' + this.state.likeNum + ')' : ''}</p>
        </div>
        <div className="widget">
          <span className="icon icon-share"></span>
          <p>分享</p>
        </div>
      </div>
    )
  }

});

export default ArticleHot;