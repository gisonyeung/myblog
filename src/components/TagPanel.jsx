import React from 'react';
import { Link } from 'react-router';
import ArchiveStore from '../stores/ArchiveStore';
import ArchiveAction from '../actions/ArchiveAction';

const TagPanel = React.createClass({

  getInitialState() {
      
    ArchiveAction.fetchTags();

    return {
      tags: ArchiveStore.getTags(),   
    };
  },

  componentDidMount() {
    ArchiveStore.addChangeListener('TAG_LIST', this.updateTags);  
  },

  componentWillUnmount() {
    ArchiveStore.removeChangeListener('TAG_LIST', this.updateTags);          
  },

  updateTags() {
    this.setState({
      tags: ArchiveStore.getTags(),
    });
  },

  render() {
    return (
      <div className={`ar-panel tag ${this.props.open ? 'open' : ''}`}>
        <div className="tag-list clearfix">
        {
          this.state.tags.map(function(tag, index) {
            return (
              <Link 
                to={`/archives?type=tag&tag=${tag.tagName}`} 
                className="ar-tag"
                key={tag.tagId}
              >
              {tag.tagName}({tag.blogs.length})
              </Link>
            )
          })  
        }
        </div>
      </div>
    )
  }

});

export default TagPanel;