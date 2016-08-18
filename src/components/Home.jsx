import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import HomeBlog from './HomeBlog';
import Icp from './Icp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Home = React.createClass({


  render() {
    return (
      <div>
        <div className="inner-wrapper">
          <ReactCSSTransitionGroup
            transitionName="blog" 
            transitionAppear={true} 
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={300}
          >
            <HomeBlog query={this.props.location.query} />
          </ReactCSSTransitionGroup>
          <SelfInfoBar />
        </div>
        <Icp />
      </div>
    )
  }

});

export default Home;


