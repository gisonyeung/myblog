import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ArchiveAction from '../actions/ArchiveAction';
import ArchiveStore from '../stores/ArchiveStore';

const Category = React.createClass({

  getInitialState() {
      
    ArchiveAction.fetchCategory();

    return {
      category: ArchiveStore.getCategory(),
    };
  },

  componentDidMount() {
    ArchiveStore.addChangeListener('CATEGORY_LIST', this.updateCate);
  },

  componentWillUnmount() {
    ArchiveStore.removeChangeListener('CATEGORY_LIST', this.updateCate);    
  },

  updateCate() {
    this.setState({
      category: ArchiveStore.getCategory(),
    });
  },

  render() {
    return (
      <div className="category-panel">
        <h2 className="title">分类</h2>
        <ul className="cate-list">
        {
          this.state.category.map(function(cate, index) {
            return (
              <li
                className="cate-item"
                key={index}
              >
                <Link to={`/archives?type=category&category=${cate.cateName}`}>{cate.cateName}</Link>
                <span className="number">（{cate.blogs.length}）</span>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }

});

export default Category;