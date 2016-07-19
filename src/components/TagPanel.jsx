import React from 'react';
import { Link } from 'react-router';


const TagPanel = React.createClass({


  render() {
    return (
      <div className="ar-panel tag">
        <div className="tag-list clearfix">
          <Link to="/" className="ar-tag">手帐(794)</Link>
          <Link to="/" className="ar-tag active">文具房(593)</Link>
          <Link to="/" className="ar-tag">纸胶带(535)</Link>
          <Link to="/" className="ar-tag">日常(448)</Link>
          <Link to="/" className="ar-tag">ameame(320)</Link>
          <Link to="/" className="ar-tag">妆点(246)</Link>
          <Link to="/" className="ar-tag">珠友(193)</Link>
          <Link to="/" className="ar-tag">胶带(88)</Link>
          <Link to="/" className="ar-tag">mt(75)</Link>
          <Link to="/" className="ar-tag">排版(37)</Link>
          <Link to="/" className="ar-tag">手帐(794)</Link>
          <Link to="/" className="ar-tag">文具房(593)</Link>
          <Link to="/" className="ar-tag">mt(75)</Link>
          <Link to="/" className="ar-tag">排版(37)</Link>
          <Link to="/" className="ar-tag">手帐(794)</Link>
          <Link to="/" className="ar-tag">文具房(593)</Link>
          <Link to="/" className="ar-tag">mt(75)</Link>
          <Link to="/" className="ar-tag">排版(37)</Link>
          <Link to="/" className="ar-tag">手帐(794)</Link>
          <Link to="/" className="ar-tag">文具房(593)</Link>



        </div>
      </div>
    )
  }

});

export default TagPanel;