import React from 'react';
import { Link } from 'react-router';
import ArchiveNav from './ArchiveNav';
import ArchiveContent from './ArchiveContent';
import Category from './Category';


require('../sass/Archives.scss');

const Archives = React.createClass({
// <a href="javascript:;" className="arrow"></a>
  render() {
    return (
      <div className="inner-wrapper archives">
        <div className="main">
          <ArchiveNav />
          <ArchiveContent
            query={this.props.location.query}
          />
        </div>
        <div className="category-bar">
          <div className="segment">
            <div className="line">
              
            </div>
          </div>
          <Category />
        </div>
      </div>
    )
  }

});

export default Archives;