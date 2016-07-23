import React from 'react';
import { Link } from 'react-router';
import ArticleContent from './ArticleContent';
import ArticleHot from './ArticleHot';
import ArticleComment from './ArticleComment';

const ArticlePanel = React.createClass({

  render() {
    return (
      <div className="article-main">
        <ArticleContent />
        <ArticleHot />
        <ArticleComment />
      </div>
    )
  }

});

export default ArticlePanel;