import React from 'react';
import { Link } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import ArticlePanel from './ArticlePanel';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../sass/Article.scss');

const Article = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
      <ReactCSSTransitionGroup
          transitionName="blog" 
          transitionAppear={true} 
          transitionAppearTimeout={400}
        >
          <ArticlePanel />
        </ReactCSSTransitionGroup>
        <SelfInfoBar />
      </div>
    )
  }

});

export default Article;