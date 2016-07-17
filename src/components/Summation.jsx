import React from 'react';

const Summation = React.createClass({

  render() {
    return (
      <section className="summation clearfix">
        <div className="data">
          <h3 className="value">2016</h3>
          <p className="key">博客</p>
        </div>
        <div className="data">
          <h3 className="value">130</h3>
          <p className="key">留言</p>
        </div>
        <div className="data">
          <h3 className="value">28</h3>
          <p className="key">订阅数</p>
        </div>
      </section>
    )
  }

});

export default Summation;