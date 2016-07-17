import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SelfInfoBar from './SelfInfoBar';

const Home = React.createClass({


  render() {
    return (
      <div className="inner-wrapper">
        <SelfInfoBar />
      </div>
    )
  }

});

export default Home;