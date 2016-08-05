import React from 'react';
import { Link } from 'react-router';
import WalkBlog from './WalkBlog';
import WalkBlogCommentBox from './WalkBlogCommentBox';
import WalkingBlogAction from '../actions/WalkingBlogAction';
import WalkingBlogStore from '../stores/WalkingBlogStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const  WalkBlogDetail = React.createClass({

  getInitialState() {

    WalkingBlogAction.fetchBlogDetail(this.props.params.postId);
    WalkingBlogAction.fetchNearBlog(this.props.params.postId);

    return {
        blog: WalkingBlogStore.getBlogDetail(),
    };
  },

  componentWillReceiveProps(nextProps) {
      if ( this.props.params.postId != nextProps.params.postId ) {
        WalkingBlogAction.fetchBlogDetail(nextProps.params.postId);
      }
  },

  componentDidMount() {

    WalkingBlogStore.addChangeListener('WALKINGBLOG_DETAIL', this.updateBlog);
    WalkingBlogStore.addChangeListener('BLOG_NEAR', this.updateNearBlog);
    
  },

  componentWillUnmount() {

    WalkingBlogStore.removeChangeListener('WALKINGBLOG_DETAIL', this.updateBlog)  
    WalkingBlogStore.removeChangeListener('BLOG_NEAR', this.updateNearBlog)  

  },

  updateBlog() {

    this.setState({
      blog: WalkingBlogStore.getBlogDetail(),
    });
    
  },

  updateNearBlog() {
    console.log(WalkingBlogStore.getNearBlog());
  },


  render() {
    return (
      <div className="inner-wrapper">
        <ReactCSSTransitionGroup
            transitionName="blogitem"
            transitionAppear={true} 
            transitionLeave={false}
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
          >
          <div className="life-wrap" key={this.state.blog.blogId}>
            <WalkBlog 
              blogId={this.state.blog.blogId || -1}
              time={this.state.blog.time.createAt || '0000-00-00'}
              photo={this.state.blog.photo || ''}
              content={this.state.blog.content || ''}
              tags={this.state.blog.tags || ''}
              numbers={this.state.blog.numbers}
              isDetail="true"
            />
            <WalkBlogCommentBox
              blogId={this.state.blog.blogId || -1}
              numbers={this.state.blog.numbers}
            />
            <div className="wbcm-page clearfix">
              <Link to="/mylife/1" className="prev"><span>«</span>上一篇</Link>
              <Link to="/mylife/1" className="next">下一篇<span>»</span></Link>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }

});

export default WalkBlogDetail;