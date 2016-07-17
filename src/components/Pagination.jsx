import React from 'react';
import { Link } from 'react-router';

require('../sass/Pagination.scss');

const Pagination = React.createClass({

  render() {
    return (
      <nav className="pagination">
          <Link to="/" className="pre-page">«</Link>
          <Link to="/page/1" className="page-number" activeClassName="active">1</Link>
          <Link to="/" className="page-number" activeClassName="active">2</Link>
          <Link to="/page/3" className="page-number" activeClassName="active">3</Link>
          <Link to="/page/4" className="page-number" activeClassName="active">4</Link>
          <span className="space">…</span>
          <Link to="/page/8" className="page-number" activeClassName="active">8</Link>
          <Link to="/page/9" className="next-page">»</Link>
      </nav>
    )
  }

});

export default Pagination;