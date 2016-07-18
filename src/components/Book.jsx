import React from 'react';
import { Link } from 'react-router';
import BookList from './BookList';
import BookPanel from './BookPanel';

require('../sass/Book.scss');

const Book = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
        <div className="book-wrap clearfix">
          <BookList />
          <BookPanel />
        </div>
      </div>
    )
  }

});

export default Book;