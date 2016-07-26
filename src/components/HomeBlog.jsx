import React from 'react';
import { Link } from 'react-router';
import HomeBlogItem from './HomeBlogItem';
import Pagination from './Pagination';
import BlogStore from '../stores/BlogStore';
import BlogAction from '../actions/BlogAction';

require('../sass/HomeBlog.scss');

const HomeBlog = React.createClass({

  getInitialState() {
      return {
          blogs: [],
      };
  },

  componentWillReceiveProps(nextProps) {

      BlogAction.fetchBlogs(nextProps.query.page);

  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_LIST', this.updateList);
    // 换成异步的时候，移至getInitial
    BlogAction.fetchBlogs(this.props.query.page);

  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BLOG_LIST', this.updateList)  

  },

  updateList() {

    this.setState({
      blogs: BlogStore.getBlogList()
    });

  },

  render() {
    return (
      <div className="home-blogs">
        <section className="blog-list">
          {
            this.state.blogs.map(function(blog, index) {
              return (
                <HomeBlogItem 
                  key={index}
                  id={blog.id}
                  data={blog}
                  title={blog.title}
                  createAt={blog.time.createAt.split(' ')[0]}
                  updateAt={blog.time.updateAt.split(' ')[0]}
                  category={blog.category}
                  summary={blog.summary}
                  tags={blog.tags}
                  numbers={blog.numbers}
                />
              )
            })
          }
        </section>
        <Pagination query={this.props.query} />
      </div>
    )
  }

});

export default HomeBlog;