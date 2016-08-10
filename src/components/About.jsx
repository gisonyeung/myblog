import React from 'react';
import { Link } from 'react-router';
import AboutPanel from './AboutPanel';
import SelfInfoBar from './SelfInfoBar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/About.scss');

const About = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
      <ReactCSSTransitionGroup
          transitionName="blog"
          transitionAppear={true} 
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <AboutPanel/>
        </ReactCSSTransitionGroup>
        <SelfInfoBar />
      </div>
    )
  }

});

export default About;