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
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}

        >
          <ArticlePanel 
            key={this.props.params.articleId}
            blogId={this.props.params.articleId} 
          />
        </ReactCSSTransitionGroup>
        <SelfInfoBar />
      </div>
    )
  }

});

export default Article;