import React from 'react';
import { Link } from 'react-router';


const DatePanel = React.createClass({


  render() {
    return (
      <div className="ar-panel date">
        <h2 className="year">
          <i className="icon icon-arleft"></i>
          <Link to="/archives">2014</Link>
          <i className="icon icon-arright"></i>
        </h2>
        <div className="date-list clearfix">
          <div className="date-item disabled">
            <h3>1月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>2月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>3月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>4月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>5月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>6月</h3>
            <p className="number">36</p>
          </div>
          <div className="date-item disabled">
            <h3>7月</h3>
            <p className="number">36</p>
          </div>
          <Link to="/" className="date-item">
            <h3>8月</h3>
            <p className="number">36</p>
          </Link>
          <Link to="/" className="date-item active">
            <h3>9月</h3>
            <p className="number">36</p>
          </Link>
          <Link to="/" className="date-item">
            <h3>10月</h3>
            <p className="number">36</p>
          </Link>
          <Link to="/" className="date-item">
            <h3>11月</h3>
            <p className="number">36</p>
          </Link>
          <Link to="/" className="date-item">
            <h3>12月</h3>
            <p className="number">36</p>
          </Link>

        </div>
      </div>
    )
  }

});

export default DatePanel;