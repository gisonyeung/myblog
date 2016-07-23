import React from 'react';
import { Link } from 'react-router';
import ArchiveNav from './ArchiveNav';
import ArchiveContent from './ArchiveContent';
import Category from './Category';

require('../sass/Archives.scss');

const Archives = React.createClass({


  render() {
    return (
      <div className="inner-wrapper archives">
        <div className="main">
          <ArchiveNav />
          <ArchiveContent />
        </div>
        <div className="category-bar">
          <div className="segment">
            <div className="line">
              <a href="javascript:;" className="arrow"></a>
            </div>
          </div>
          <Category />
        </div>
      </div>
    )
  }

});

export default Archives;