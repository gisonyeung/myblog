import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import HomeBlog from './HomeBlog';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Home = React.createClass({


  render() {
    return (
      <div className="inner-wrapper">
        <ReactCSSTransitionGroup
          transitionName="blog" 
          transitionAppear={true} 
          transitionAppearTimeout={400}
        >
          <HomeBlog query={this.props.location.query} />
        </ReactCSSTransitionGroup>
        <SelfInfoBar />
      </div>
    )
  }

});

export default Home;


