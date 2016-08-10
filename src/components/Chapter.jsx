import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Chapter = React.createClass({


  render() {
    return (
      <div className="chapter">
       <h2 className="ch-title">{this.props.header.substring(0,4)}年{this.props.header.substring(4,6).replace(/^0/, '')}月 / {this.props.blogs.length}篇文章</h2>
       <div className="ch-list clearfix">
         <ReactCSSTransitionGroup
           transitionName="fade" 
           transitionEnterTimeout={400}
           transitionLeaveTimeout={300}
         >
         {
           this.props.blogs.map(function(blog, index) {
             return (
               <Link 
                 to={`/article/${blog.blogId}`} 
                 className="ch-item"
                 key={blog.blogId}
               >
                 <span className="date">{dateFormat(blog.time.createAt, 'M-DD')}</span>
                 <span>{blog.title}</span>
               </Link>
             )
           })
         }
         </ReactCSSTransitionGroup>
       </div>
      </div>
    )
  }

});

export default Chapter;