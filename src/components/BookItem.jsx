import React from 'react';
import { Link } from 'react-router';


const BookItem = React.createClass({


  render() {
    return (
      <li>
        <Link to="/book" className="clearfix">
          <p className="book-name">Javascript 高级程序设计(第三版)</p>
          <span className="price">￥32</span>
        </Link>
      </li>
    )
  }

});

export default BookItem;