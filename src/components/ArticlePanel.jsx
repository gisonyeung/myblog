import React from 'react';
import { Link } from 'react-router';
import ArticleContent from './ArticleContent';
import ArticleHot from './ArticleHot';
import ArticleComment from './ArticleComment';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';

const ArticlePanel = React.createClass({

  getInitialState() {
    // 换成异步的时候，移至getInitial
    BlogAction.fetchBlogDetail(this.props.blogId);
    return {
        blog: {
          time: {},
          numbers: {
          	like: 0,
          	view: 0,
          }
        },
    };
  },

  componentWillReceiveProps(nextProps) {

    // 相等的时候，不更新
    if(nextProps.blogId == this.props.blogId) {
      return false;
    }

    // 于当前页切换博文详情时，发送请求更新文章，并将页面置顶
    BlogAction.fetchBlogDetail(nextProps.blogId);
    window.scrollTo(0,0);
    
  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_DETAIL', this.updateContent);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BLOG_DETAIL', this.updateContent)  

  },

  updateContent() {
    this.setState({ 
      blog: BlogStore.getBlogDetail() 
    });

    setTimeout(() => {
      docuemnt.querySelectorAll('.atc-content pre code').forEach(block => {
        hljs.highlightBlock(block);
      })
    }, 200);
  },	

  render() {
    return (
      <div className="article-main">
        <ArticleContent 
          blogId={this.state.blog.blogId || -1}
          title={this.state.blog.title || '此文章不存在'}
          createAt={this.state.blog.time.createAt || '0000:00:00'}
          updateAt={this.state.blog.time.updateAt || '0000:00:00'}
          category={this.state.blog.category || ''}
          content={this.state.blog.content || ''}
          tags={this.state.blog.tags || ''}
        />
        {
          this.state.blog.blogId ? 
          <ArticleHot
            blogId={this.state.blog.blogId || -1}
            numbers={this.state.blog.numbers}
          />
          : ''
        }
        {
          this.state.blog.blogId ? 
          <ArticleComment
            blogId={this.state.blog.blogId || -1}
          />
          : ''
        }
      </div>
    )
  }

});

export default ArticlePanel;