import React from 'react';
import { Link } from 'react-router';
import WalkBlog from './WalkBlog';

// require('../sass/Mylife.scss');

const  Mylife = React.createClass({

  render() {
    return (
      <div className="inner-wrapper">
        <div className="life-wrap">
          <WalkBlog />
          <WalkBlog />
          <WalkBlog />
          <WalkBlog />
          <WalkBlog />

        </div>
      </div>
    )
  }

});

export default Mylife;