import React from 'react';
import { Link } from 'react-router';
// import BookList from './BookList';
// import BookPanel from './BookPanel';
import BookWidget from './BookWidget';

require('../sass/Book.scss');

const Book = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
        <div className="b-head">
          <h2 className="title">我的书单 <span>(32)</span></h2>
          <p className="about">一些看过的书，有好的，有坏的。</p>
          <p className="about">如果下面也有你推荐的书，请随手加个热度。</p>
        </div>
        <div className="b-body innew-wrapper">
          <div className="b-list clearfix">
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />
            <BookWidget />

          </div>
        </div>
      </div>
    )
  }

});

export default Book;