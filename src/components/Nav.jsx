import React from 'react';
import { IndexLink, Link } from 'react-router';
import SearchBar from './SearchBar';

require('../sass/Nav.scss');

const Nav = React.createClass({

  getInitialState() {
      return {
          stateClass: ''  
      };
  },

  componentWillReceiveProps(nextProps) {
  	console.log(1);
  	// 判断location 加载不同css文件
    var path = location.pathname;


    if( /^\/mylife/.test(path) ) { // mylife

    	document.body.className = 'mylife';
    	this.setState({
    		stateClass: 'mylife'
    	});

    } else {

    	document.body.className = '';
    	this.setState({
    		stateClass: ''
    	});

    }
        
  },


  render() {

    return (
      <header className={`nav ${this.state.stateClass}`}>
      	<div className="inner-wrapper clearfix">
	      <Link to="/" className="brand" title="二点零的个人站点">TWOPOINTHOLE</Link>
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