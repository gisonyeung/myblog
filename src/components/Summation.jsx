import React from 'react';
import SiteAction from '../actions/SiteAction';
import SiteStore from '../stores/SiteStore';

const Summation = React.createClass({

  getInitialState() {
    return {
      numbers: SiteStore.getSiteNum(),  
    };
  },

  componentDidMount() {
    SiteStore.addChangeListener('SITE_NUMBERS', this.updateNumbers);  
  },

  componentWillUnMount() {
    SiteStore.removeChangeListener('SITE_NUMBERS', this.updateNumbers);   
  },

  updateNumbers() {
    this.setState({
      numbers: SiteStore.getSiteNum(),
    });
  },

  render() {
    return (
      <section className="summation clearfix">
        <div className="data">
          <h3 className="value">{this.state.numbers.blog}</h3>
          <p className="key">博客</p>
        </div>
        <div className="data">
          <h3 className="value">{this.state.numbers.comment}</h3>
          <p className="key">留言</p>
        </div>
        <div className="data">
          <h3 className="value">{this.state.numbers.subscribe}</h3>
          <p className="key">订阅数</p>
        </div>
      </section>
    )
  }

});

export default Summation;