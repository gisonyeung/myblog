import React from 'react';
import { Link } from 'react-router';
import Chapter from './Chapter';
import _ from 'lodash';
import ArchiveAction from '../actions/ArchiveAction';
import ArchiveStore from '../stores/ArchiveStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ArchiveContent = React.createClass({

  getInitialState() {
      
    let query = this.props.query;

    if ( !_.isEmpty(query) ) {
      ArchiveAction.fetchByCondition(query);
    } else {
      ArchiveAction.fetchAll();
    }

    return {
      archives: ArchiveStore.getArchives(),   
    };
  },

  componentWillReceiveProps(nextProps) {
    let query = nextProps.query;

    if ( !_.isEmpty(query) ) {
      ArchiveAction.fetchByCondition(query);
    } else {
      ArchiveAction.fetchAll();
    }
  },

  componentDidMount() {
    ArchiveStore.addChangeListener('ARCHIVES_LIST', this.updateArchives);
  },

  componentWillUnmount() {
    ArchiveStore.removeChangeListener('ARCHIVES_LIST', this.updateArchives);    
  },

  updateArchives() {

    this.setState({
      archives: ArchiveStore.getArchives(),
    });
  },


  render() {
    return (
      <div className="ar-content">
        <ReactCSSTransitionGroup
          transitionName="blogitem" 
          transitionEnterTimeout={400}
          transitionLeaveTimeout={300}
        >
        {
        	!this.state.archives.length ? 
        	<p className="no-result"><span className="emoji">💔</span>没有符合此条件的博文</p>
        	:
        	''
        }
        {
          this.state.archives.map(function(archive, index) {
            return (
              <Chapter
                key={archive.header}
                header={archive.header}
                blogs={archive.blogs}
              />
            )
          })
        }
        </ReactCSSTransitionGroup>
      </div>
    )
  }

});

export default ArchiveContent;