import React from 'react';
import Nav from './Nav';
import { Router, Route, browserHistory } from 'react-router';

const App = React.createClass({


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