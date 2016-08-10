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

  componentDidMount() {
    // 第一次访问时，不会触发WillReceiveProps，所以需要用到DidMout
    this.selectStyle();  
  },


  componentWillReceiveProps(nextProps) {
  	
    this.selectStyle();
  },

  /*
  *  @description 判断location 加载不同css文件 
  */
  selectStyle() { // 
    
    var path = location.pathname;


    if( /^\/mylife/.test(path) ) { // mylife

    	document.body.className = '';
    	this.setState({
    		stateClass: 'mylife'
    	});

    } else if( /^\/book/.test(path) ) {

      document.body.className = 'book';
      this.setState({
        stateClass: 'book'
      });

    } else if( /^\/archives/.test(path) ) {

      document.body.className = 'archives';
      this.setState({
        stateClass: 'archives'
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
	          <Link to="/mylife" activeClassName="active">日常</Link>
	          <Link to="/book" activeClassName="active">我的书单</Link>
	          <Link to="/archives" activeClassName="active">归档</Link>
	          <Link to="/board" activeClassName="active">留言板</Link>
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