import React from 'react';
import { Link } from 'react-router';
import HomeBlogItem from './HomeBlogItem';
import Pagination from './Pagination';
import BlogStore from '../stores/BlogStore';
import BlogAction from '../actions/BlogAction';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/HomeBlog.scss');

const HomeBlog = React.createClass({

  

  getInitialState() {
    let pageNum = BlogStore.getPageNum();

    // 页码不同再重新拉起
    if (pageNum != this.props.query.page) {
      // 换成异步的时候，移至getInitial
      BlogAction.fetchBlogs(this.props.query.page);
    }

    return {
      pageNum: this.props.query.page,
      blogs: BlogStore.getBlogList(),
    };
  },
 
  componentWillReceiveProps(nextProps) {
    // 和缓存同页码则直接获取 state 的缓存
    if (nextProps.query.page === this.pageNum) {
      return this.updateList();
    }

    BlogAction.fetchBlogs(nextProps.query.page);

  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_LIST', this.updateList);
    

  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BLOG_LIST', this.updateList)  

  },

  updateList() {
    this.setState({
      blogs: BlogStore.getBlogList(),
      pageNum: BlogStore.getPageNum()
    });

  },

  render() {
    return (
      <div className="home-blogs">
        <section className="blog-list">
          <ReactCSSTransitionGroup
            transitionName="blogitem" 
            transitionEnterTimeout={400}
            transitionLeaveTimeout={300}
          >
          {
            this.state.blogs.length ?
            ''
            :
            <p className="no-blog">暂无博文</p>
          }
          {
            this.state.blogs.map(function(blog, index) {
              return (
                <HomeBlogItem 
                  key={blog._id}
                  id={blog.blogId}
                  data={blog}
                  title={blog.title}
                  createAt={blog.time.createAt}
                  updateAt={blog.time.updateAt}
                  category={blog.category}
                  summary={blog.summary}
                  tags={blog.tags}
                  numbers={blog.numbers}
                />
              )
            })
          }
          </ReactCSSTransitionGroup>
        </section>
        <Pagination query={this.props.query} />
      </div>
    )
  }

});

export default HomeBlog;