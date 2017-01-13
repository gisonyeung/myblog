import React from 'react';
import Nav from './Nav';
import { Router, Route, browserHistory } from 'react-router';
import SiteAction from '../actions/SiteAction';

const App = React.createClass({

  componentWillMount() {
  	// 增加博客访问量
    SiteAction.addSiteView();
  },

  render() {
  	
    return (
      <div>
        <Nav />
        {this.props.children}
        
      </div>
    )
  }

});

export default App;