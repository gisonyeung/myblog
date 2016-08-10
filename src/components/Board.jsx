import React from 'react';
import { Link } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import BoardComment from './BoardComment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Board = React.createClass({

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
          <BoardComment/>
        </ReactCSSTransitionGroup>
        <SelfInfoBar />
      </div>
    )
  }

});

export default Board;