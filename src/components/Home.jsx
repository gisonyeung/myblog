import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import HomeBlog from './HomeBlog';

const Home = React.createClass({


  render() {
    return (
      <div className="inner-wrapper">
        <HomeBlog />
        <SelfInfoBar />
      </div>
    )
  }

});

export default Home;