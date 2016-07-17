import React from 'react';
import { Link } from 'react-router';
import HomeBlogItem from './HomeBlogItem';
import Pagination from './Pagination';

require('../sass/HomeBlog.scss');

const HomeBlog = React.createClass({

  render() {
    return (
      <div className="home-blogs">
        <section className="blog-list">
          <HomeBlogItem />
          <HomeBlogItem />
          <HomeBlogItem />
          <HomeBlogItem />
          <HomeBlogItem />
          <HomeBlogItem />
        </section>
        <Pagination />
      </div>
    )
  }

});

export default HomeBlog;