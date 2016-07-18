import React from 'react';
import { Link } from 'react-router';
import DatePanel from './DatePanel';
import TagPanel from './TagPanel';


const ArchiveNav = React.createClass({


  render() {
    return (
      <div className="ar-nav">
        <Link to="/" className="nav-link">全部文章（128）</Link>
        <div className="switch nav-link">
          <a href="javascript:;" className="nav-down">日期</a>
          <DatePanel />
        </div>
        <div className="switch nav-link">
          <a href="javascript:;" className="nav-down">标签</a>
          <TagPanel />
        </div>
      </div>
    )
  }

});

export default ArchiveNav;