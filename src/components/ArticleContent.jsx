import React from 'react';
import { Link } from 'react-router';

const ArticleContent = React.createClass({

  render() {
    return (
      <article className="content shadow-1">
        <div className="atc-top">
          <h1 className="title">函数式编程柯里化</h1>
          <div className="subtitle">
            <span>
              <i className="icon icon-time" title="发表时间"></i>
              <time>2016-06-23</time>
            </span>
            <span>
              <i className="icon icon-update" title="最后更新时间"></i>
              <time>2016-06-23</time>
            </span>
            <Link to="/" title="分类">JS杂谈</Link>
          </div>
        </div>
        <div className="atc-content">
        	<p>性能优化一直是前端一个<code>比较重要</code>的课题，在前面看过《web性能权威指南》以及雅虎军规之后，对性能优化方面的常见的手段进行简单的总结。</p>
        	<h2>性能优化</h2>
        	<h3>尽可能的减少 HTTP 请求数</h3>
        	<p>HTTP请求意味着必须先进行TCP三次握手，同时如果要传输的数据比较小，而http头部的大小往往会比较大，相比之下数据传输率会比较小。因此很多时候，我们会将一些请求合并，比如图标使用雪碧图来管理、一些图片还可以用base64内嵌加载。</p>
        	<p>而使用雪碧图带来的最大问题是，管理不方便，解决方法是通过自动化工具管理，而非手动管理。使用base64内嵌的话，缺点在于base64会比图片体积大20%左右，而且不利于缓存，另外一个问题是base64在页面中解析也需要消耗一定的CPU时间。</p>
        	<h3>重用TCP连接</h3>
        	<p>http1.1版本会默认开启持久连接，在http1.0则需要设置Connection: Keep-Alive。使用持久连接，能避免每次http连接都要经历TCP三次握手（除了第一次连接之外）以及慢启动延迟。</p>
        	<p>http2.0相对于http1.0带来的变化主要是四点支持多向请求和响应请求优先级头部压缩服务器推送http2.0会将要传输的信息分割成更小的消息和帧，并对它们采用二进制格式的编码，其中头部信息会被包装在HEADERS帧，报文主体被包装为DATA帧，然后所有的http2.0的消息都会在一个TCP连接中传输，可以双向传输，也可以乱序发送，接收端接收之后会根据每个帧的标识重新组装。正因为http2.0可以乱序发送然后再另一端再根据帧的标识重新组装，即每个帧都是独立的，这样子就可以做到并行交错发送请求或者发送响应。那么我们在http2.0以前，要实现多向请求和响应，通常是使用多个TCP连接甚至域名分区扩展多个TCP连接，这样的做法在http2.0就反而不适用（多做了很多工作，同时还有TCP连接过程中的延迟）在浏览器渲染页面时，通常最先下载下来的应该是HTML文档，然后是CSS样式表，紧接着是脚本资源和图片资源，这些是最理想的下载顺序。但是在有些浏览器下或者说某些情况，明明我们需要迫切等待css下载，而浏览器却在加载图片！！！因此，http2.0请求优先级的加入，可以解决这个痛点。在前面提到的性能优化中的一点，减少http请求，即合并文件使用一个http请求。但在http2.0里面使用这一点只会带来管理不方便、缓存容易失效、不易模块化这些问题，而对性能帮助基本没有。因为，http2.0在同一个TCP连接传输，而且http2.0在客户端和服务端使用“首部表”来跟踪和存储之前发送的键值对，http2.0以前因此http头部过大的顾虑现在完全不用再顾虑了。http2.0另一个新东西就是服务器推送，试想一下，当我们请求一个HTML文档的时候，服务器返回这个文档给我们的同时，又给我们推送对应css样式、脚本资源、图片资源，这样的新功能是不是很让人兴奋！！！</p>
        	<ul>
        		<li>哈哈哈</li>
        		<li>哈哈哈</li>
        		<li>哈哈哈</li>
        		<li>哈哈哈</li>
        	</ul>
        	<blockquote>
        		哈哈哈哈哈哈哈哈哈哈
        		<br/>
        		哈哈哈哈哈哈哈哈哈
        	</blockquote>
        </div>
        <div className="atc-bottom">
        	<ul className="tags">
        	  <li className="tag"><Link to="/">#Javascript</Link></li>
        	  <li className="tag"><Link to="/">#算法</Link></li>
        	  <li className="tag"><Link to="/">#函数式编程</Link></li>
        	</ul>
        	<div className="page">
        	  <Link to="/article/1" className="left">
        	    <span className="icon icon-pageleft"></span>
        	    <span className="text">underscore的keys方法详解</span>
        	  </Link>
        	  <Link to="/article/1" className="right">
        	    <span className="text">浏览器地址栏输入url到整个页面呈现（五）</span>
        	    <span className="icon icon-pageright"></span>
        	  </Link>
        	</div>
        </div>



      </article>
    )
  }

});

export default ArticleContent;