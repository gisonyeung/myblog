import React from 'react';
import { Link } from 'react-router';

 require('../sass/WalkBlog.scss');
const photo1 = require('../img/demo-photo1.jpg');

const  WalkBlog = React.createClass({

  render() {
    return (
      <article className="box-wrap walkblog">
        <div className="walk-content">
          <div className="cont-top">
            <div className="cont-wrap">
              <h2 className="time nophoto">
                <span>2016-07-18</span>
              </h2>
              <Link to="/mylife/1" className="picture" title="查看全文">
                <img src={photo1} />
              </Link>
            </div>
          </div>
          <div className="cont-mid">
            <div className="cont-wrap">
              <div className="text">
                <p>朋友我当你一秒朋友<br/>朋友我当你一世朋友</p>
              </div>
              <div className="tags">
                <Link to="/tag/手工">#手工</Link>
                <Link to="/tag/橡皮章">#橡皮章</Link>
                <Link to="/tag/字章">#字章</Link>
                <Link to="/tag/橡皮活字印刷术">#橡皮活字印刷术</Link>
              </div>
              <div className="summation">
                <Link to="/mylife/1" className="icon icon-hot">热度 42</Link>
                <Link to="/mylife/1" className="icon icon-comment">评论 5</Link>
                <Link to="/mylife/1" className="full" title="查看全文">全文链接 »</Link>
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