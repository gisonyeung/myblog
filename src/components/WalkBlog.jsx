import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';

 // require('../sass/WalkBlog.scss');
const photo1 = require('../img/demo-photo2.jpg');

const  WalkBlog = React.createClass({

  render() {

    const that = this;

    let tags = this.props.tags.split(',');
    // 第一项为空
    tags = tags[0] ? tags : [];

    // 格式化内容
    let content = {
      __html: that.props.content.replace(/\n/g, '<br/>')
    };

    let hot = this.props.numbers.view + this.props.numbers.comment;
    

    return (
      <article className="box-wrap walkblog">
        <div className="wb-side">
          <div className="date" title={dateFormat(this.props.time, 'YYYY-MM-DD hh:mm:ss')}>
            <p className="day">{dateFormat(this.props.time, 'DD')}</p>
            <p className="month">{dateFormat(this.props.time, 'M')}月</p>
          </div>
          <p className="year">{dateFormat(this.props.time, 'YYYY')}</p>
        </div>
        <div className={`wb-cont line ${this.props.photo ? '' : 'nophoto'}`}>
          {
            this.props.isDetail == 'true'? 
            <span className="picture">
              <img src={this.props.photo} />
            </span>
            :
            <Link to={`/mylife/${this.props.blogId}`} className="picture" title="查看全文">
              <img src={this.props.photo}/>
            </Link>
          }
          <div className="text" dangerouslySetInnerHTML={content} />
          <div className="tags">
          {
            tags.map(function(tag, index) {
              return (
                <span key={index}>● {tag}</span>
              )
            })
          }
          </div>
          <div className="link">
            {
              hot && this.props.isDetail == 'false' ? 
              <Link to={`/mylife/${this.props.blogId}`}>热度({hot})</Link>
              :
              ''
            }
            {
              this.props.numbers.comment && this.props.isDetail == 'false' ? 
              <Link to={`/mylife/${this.props.blogId}`}>评论({this.props.numbers.comment})</Link>
              : 
              ''
            }
            {
              this.props.isDetail == 'true' ? '' :
              <Link to={`/mylife/${this.props.blogId}`} title="查看全文">全文链接 </Link>
            }
          </div>
        </div>
      </article>
    )
  }

});

export default WalkBlog;