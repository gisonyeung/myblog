import React from 'react';
import { Link } from 'react-router';
import Chapter from './Chapter';

const ArchiveContent = React.createClass({


  render() {
    return (
      <div className="ar-content">
        <Chapter />
        <Chapter />
        <Chapter />
      </div>
    )
  }

});

export default ArchiveContent;