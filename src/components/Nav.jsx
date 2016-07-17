import React from 'react';
import { IndexLink, Link } from 'react-router';
import SearchBar from './SearchBar';

require('../sass/Nav.scss');

const Nav = React.createClass({
	
  render() {
    return (
      <header className="nav">
      	<div className="inner-wrapper clearfix">
	      <a href="#" className="brand" title="二点零的个人站点">TWOPOINTHOLE</a>
	      <nav className="nav-bar">
	        <div className="nav-list">
	          <IndexLink to="/" activeClassName="active">首页</IndexLink>
	          <Link to="/mylife" activeClassName="active">我的生活</Link>
	          <Link to="/book" activeClassName="active">推荐书目</Link>
	          <Link to="/tag" activeClassName="active">分类标签</Link>
	          <Link to="/archive" activeClassName="active">归档</Link>
	          <Link to="/about" activeClassName="active">关于</Link>
	          <span className="triangle" />
	        </div>
	        <SearchBar />
	      </nav>
        </div>
      </header>
    )
  }

});

export default Nav;