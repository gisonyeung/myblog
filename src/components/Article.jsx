import React from 'react';
import { Link } from 'react-router';
import SelfInfoBar from './SelfInfoBar';
import ArticlePanel from './ArticlePanel';

require('../sass/Article.scss');

const Article = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
        <ArticlePanel />
        <SelfInfoBar />
      </div>
    )
  }

});

export default Article;