import React from 'react';
import { browserHistory } from 'react-router'

const SearchBar = React.createClass({
	
  handleSearch(e) {    

    if ( e.which == 13 ) {
      var search = this.refs.search.value.trim().replace(/\+|,|，|-| /g, '+');    

      if ( /\S/.test(search) ) {

      	this.refs.search.blur();

        browserHistory.push({
          pathname: '/archives',
          query: { 
          	type: 'search',
          	q: search,
          },
          state: { fromDashboard: true }
        });

      }    
    

    }

  },

  render() {
    return (
      <div className="search-bar">
        <input 
          name="q" 
          type="text" 
          placeholder="搜索标签、文章"  
          onKeyUp={this.handleSearch}
          ref="search"
        />
        <span className="icon icon-search"></span>
      </div>
    )
  }

});

export default SearchBar;

