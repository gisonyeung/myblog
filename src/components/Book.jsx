import React from 'react';
import { Link } from 'react-router';
// import BookList from './BookList';
// import BookPanel from './BookPanel';
import BookWidget from './BookWidget';
import BookAction from '../actions/BookAction';
import BookStore from '../stores/BookStore';
import ls from '../utils/localStorage';

require('../sass/Book.scss');

const Book = React.createClass({

  getInitialState() {

    BookAction.fetchBooks();

    return {
      books: BookStore.getBookList(),  
    };
  },

  componentDidMount() {
    BookStore.addChangeListener('BOOK_LIST', this.updateBooks);  
    BookStore.addChangeListener('REFRESH_LIKE', this.updateLike);
  },

  componentWillUnmount() {
    BookStore.removeChangeListener('BOOK_LIST', this.updateBooks);     
    BookStore.removeChangeListener('REFRESH_LIKE', this.updateLike);
  },

  updateBooks() {
    this.setState({
      books: BookStore.getBookList(),
    });
  },

  // 存储进localStorage
  updateLike(data) {

    // 成功，存进localStorage
    if ( data.result == 'success' ) {

      let BookLike = ls.get('BookLike');
      BookLike[data.bookId] = 1;
      ls.set('BookLike', BookLike);

    };
    
  },

  render() {
    return (
      <div className="inner-wrapper">
        <div className="b-head">
          <h2 className="title">我的书单 <span>{this.state.books.length ? '(' + this.state.books.length + ')' : ''}</span></h2>
          <p className="about">学生时期一些看过的书，内容有好有坏。</p>
          <p className="about">如果下面也有你推荐的书，欢迎随手加个热度~</p>
        </div>
        <div className="b-body innew-wrapper">
          <div className="b-list clearfix">
            {
              this.state.books.map(function(book, index) {
                return (
                  <BookWidget 
                    key={book.bookId}
                    bookId={book.bookId}
                    name={book.name}
                    photo={book.photo}
                    description={book.description}
                    time={book.time}
                    recommend={book.recommend}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

});

export default Book;