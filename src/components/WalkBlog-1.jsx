import React from 'react';
import { Link } from 'react-router';
import dateFormat from '../utils/dateFormat';

 // require('../sass/WalkBlog.scss');
const photo1 = require('../img/demo-photo1.jpg');

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
        <div className="walk-content">
          <div className="cont-top">
            <div className="cont-wrap">
              <h2 className={`time ${this.props.photo ? '' : 'nophoto'}`}>
                <span>{dateFormat(this.props.time, 'YYYY-MM-DD')}</span>
              </h2>
              {
                this.props.isDetail == 'true'? 
                <span className="picture">
                  <img src={this.props.photo} />
                </span>
                :
                <Link to={`/mylife/${this.props.blogId}`} className="picture" title="查看全文">
                  <img src={this.props.photo} />
                </Link>
              }
              
            </div>
          </div>
          <div className="cont-mid">
            <div className="cont-wrap">
              <div className="text">
                <p dangerouslySetInnerHTML={content} />
              </div>
              <div className="tags">
                {
                  tags.map(function(tag, index) {
                    return (
                      <span key={index}>#{tag}</span>
                    )
                  })
                }
              </div>
              <div className="summation">
                {
                  hot && this.props.isDetail == 'false' ? 
                  <Link to={`/mylife/${this.props.blogId}`}>热度 {hot}</Link>
                  :
                  ''
                }
                {
                  this.props.numbers.comment && this.props.isDetail == 'false' ? 
                  <Link to={`/mylife/${this.props.blogId}`}>评论 {this.props.numbers.comment}</Link>
                  : 
                  ''
                }
                {
                  this.props.isDetail == 'true' ? '' :
                  <Link to={`/mylife/${this.props.blogId}`} className="full" title="查看全文">全文链接 »</Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="cont-bot">
          <div className="cont-bot-r">
            <div className="cont-bot-m">
              <div className="cont-bot-sl"></div>
              <div className="cont-bot-sr"></div>
            </div>
          </div>
        </div>
      </article>
    )
  }

});

export default WalkBlog;