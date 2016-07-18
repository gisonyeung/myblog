import React from 'react';
import { Link } from 'react-router';
import BookItem from './BookItem';


const BookList = React.createClass({


  render() {
    return (
      <div className="book-bar">
        <ul className="book-list shadow-1">
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
        </ul>
        <p className="number">共 34 本</p>
      </div>
    )
  }

});

export default BookList;