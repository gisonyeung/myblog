import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import BlogAction from '../actions/BlogAction';
import BlogStore from '../stores/BlogStore';
import _ from 'lodash';

const ArticleContent = React.createClass({

  getInitialState() {
    

    return {
        nearBlog: {
          prev: {
            blogId: -1,
            title: '',
          },
          next: {
            blogId: -1,
            title: '',
          }
        }
    };
  },

  componentWillReceiveProps(nextProps) {
    
    // 相等的时候，不更新
    if(nextProps.blogId == this.props.blogId || this.props.blogId != -1) {
      return false;
    }


    // 换成异步的时候，移至WillReceiveProps
    BlogAction.fetchNearBlog(nextProps.blogId);
  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_NEAR', this.updateNearBlog);
    
  },

  componentWillUnmount() {

    BlogStore.removeChangeListener('BLOG_NEAR', this.updateNearBlog)  

  },

  updateNearBlog() {
    this.setState({
      nearBlog: BlogStore.getNearBlog()
    });

  },

  render() {

    let content = {
      __html: this.props.content,
    }

    return (
      <article className="content shadow-1">
        <div className="atc-top">
          <h1 className="title">{this.props.title}</h1>
          {
            this.props.blogId == -1 ? '' :
            <div className="subtitle">
              <span>
                <i className="icon icon-time" title={`发表时间: ${dateFormat(this.props.createAt, "YYYY-MM-DD hh:mm:ss")}`}></i>
                <time>{dateFormat(this.props.createAt, "YYYY-MM-DD hh:mm")}</time>
              </span>
              <span>
                <i className="icon icon-update" title={`最后更新时间: ${dateFormat(this.props.createAt, "YYYY-MM-DD hh:mm:ss")}`}></i>
                <time>{dateFormat(this.props.updateAt, "YYYY-MM-DD hh:mm")}</time>
              </span>
              <Link to={`/archives?type=category&category=${this.props.category}`} title="分类">{this.props.category}</Link>
              <a href="#comment" className="toComment">#跳到评论#</a>
            </div>
          }
        </div>
        <div className="atc-content" dangerouslySetInnerHTML={content} />
        <div className="atc-bottom">
        	<ul className="tags">
              {
                this.props.tags.split(',').map(function(tag, index) {

                    return (
                      tag ? 
                      <li className="tag" key={index}><Link to={`/archives?type=tag&tag=${tag}`}>{tag}</Link></li>
                      :
                      ""
                    )
                })
              }
        	</ul>
        	<div className="page">
            { 
              this.state.nearBlog.next.blogId > 0 ? 
              <Link to={`/article/${this.state.nearBlog.next.blogId}`} className="left">
                <span className="icon icon-pageleft"></span>
                <span className="text">{this.state.nearBlog.next.title}</span>
              </Link>
              : ''
            }
            { 
              this.state.nearBlog.prev.blogId > 0 ? 
              <Link to={`/article/${this.state.nearBlog.prev.blogId}`} className="right">
                <span className="text">{this.state.nearBlog.prev.title}</span>
                <span className="icon icon-pageright"></span>
              </Link>
              : ''
            }
        	</div>
        </div>



      </article>
    )
  }

});

export default ArticleContent;