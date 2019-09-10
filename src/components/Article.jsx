import React from 'react';
import { Link } from 'react-router';
import AnchorBar from './AnchorBar';
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
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <ArticlePanel 
            key={this.props.params.articleId}
            blogId={this.props.params.articleId} 
          />
        </ReactCSSTransitionGroup>
        <SelfInfoBar simpleMode={true} />
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <AnchorBar blogId={this.props.params.articleId} />
        </ReactCSSTransitionGroup>
      </div>
    )
  }

});

export default Article;