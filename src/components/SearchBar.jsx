import React from 'react';

const SearchBar = React.createClass({
	
  render() {
    return (
      <div className="search-bar">
        <input name="q" type="text" placeholder="搜索标签、文章" />
        <span className="icon icon-search"></span>
      </div>
    )
  }

});

export default SearchBar;

