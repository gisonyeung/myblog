import React from 'react';
import { Link } from 'react-router';
import WalkBlog from './WalkBlog';
import WalkingBlogAction from '../actions/WalkingBlogAction';
import WalkingBlogStore from '../stores/WalkingBlogStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


// require('../sass/Mylife.scss');

const  Mylife = React.createClass({

  getInitialState() {

    // 请求博客列表
    WalkingBlogAction.fetchBlogs();

    return {
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
      blogs: WalkingBlogStore.getBlogList(),
    });
  },




  render() {
    return (
      <div className="inner-wrapper">
        <div className="life-wrap">
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
        </div>
      </div>
    )
  }

});

export default Mylife;