import React from 'react';
import { Link } from 'react-router';
import WalkBlog from './WalkBlog';
import WalkingBlogAction from '../actions/WalkingBlogAction';
import WalkingBlogStore from '../stores/WalkingBlogStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


require('../sass/Mylife.scss');

const  Mylife = React.createClass({

  getInitialState() {

    return {
      isLoadMoreShow: false,
      record: WalkingBlogStore.getBlogRecord(),
      blogs: WalkingBlogStore.getBlogList(),
    };

  },

  componentDidMount() {
    WalkingBlogStore.addChangeListener('BLOG_LIST', this.updateBlogs);
  },

  componentWillUnmount() {
    WalkingBlogStore.removeChangeListener('BLOG_LIST', this.updateBlogs);    
  },

  updateBlogs() {
    this.setState({
      isLoadMoreShow: true,
      record: WalkingBlogStore.getBlogRecord(),
      blogs: WalkingBlogStore.getBlogList(),
    });
  },

  // 点击按钮，则先隐藏按钮，并发出请求
  loadMoreComments() {

    WalkingBlogAction.fetchBlogs_more();
    this.setState({
      isLoadMoreShow: false,
    });
  },


  render() {
    return (
      <div className="inner-wrapper">
        <div className="life-wrap shadow-1">
          <div className="banner">
            <h1>惜有</h1>
            <p>找个风口，俯瞰灯火阑珊。</p>
          </div>
          <ReactCSSTransitionGroup
            transitionName="blogitem"
            transitionAppear={true}
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={300}
          >
            {
              this.state.blogs.map(function(blog, index) {
                return (
                  <WalkBlog
                    key={blog.blogId}
                    blogId={blog.blogId || -1}
                    time={blog.time.createAt || '0000:00:00'}
                    photo={blog.photo || ''}
                    content={blog.content || ''}
                    tags={blog.tags || ''}
                    numbers={blog.numbers}
                    isDetail="false"
                  />
                )
              })
            }
          </ReactCSSTransitionGroup>
          {
              this.state.record.index == this.state.record.allCount || !this.state.isLoadMoreShow ? 
              ""
              :
              <p 
                className="loadmore"
                onClick={this.loadMoreComments}
              ><span>加载更多</span><span className="icon icon-loadmore"></span></p>
            }
        </div>
      </div>
    )
  }

});

export default Mylife;