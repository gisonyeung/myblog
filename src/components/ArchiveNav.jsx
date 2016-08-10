import React from 'react';
import { Link } from 'react-router';
import DatePanel from './DatePanel';
import TagPanel from './TagPanel';
import BlogStore from '../stores/BlogStore';
import BlogAction from '../actions/BlogAction';


const ArchiveNav = React.createClass({

  getInitialState() {
      
    BlogAction.fetchCount();

    return {
      count: BlogStore.getBlogsCount(),  
      open: {
        date: false,
        tag: false,
      },
      loadPanel: {
        date: false,
        tag: false,
      }

    };
  },

  componentWillReceiveProps(nextProps) {
      this.closePanel();
  },

  componentDidMount() {
    BlogStore.addChangeListener('BLOG_COUNT', this.updateCount);  
  },

  componentWillUnmount() {
    BlogStore.removeChangeListener('BLOG_COUNT', this.updateCount);      
  },

  updateCount(count) {
    this.setState({
      count: count,
    });
  },

  openPanel(type) {
    const that = this;

    switch(type) {
      case 'date':
        if ( !that.state.loadPanel.date ) {
          this.setState({
            loadPanel: {
              date: true,
              tag: that.state.loadPanel.tag,
            }
          });
        }
        this.setState({
          open: {
            date: !that.state.open.date,
            tag: false,
          }
        });
        break;
      case 'tag':
        if ( !that.state.loadPanel.tag ) {
          this.setState({
            loadPanel: {
              date: that.state.loadPanel.date.date,
              tag: true,
            }
          });
        }
        this.setState({
          open: {
            date: false,
            tag: !that.state.open.tag,
          }
        });
        break;
    }
  },

  closePanel() {
    this.setState({
      open: {
        date: false,
        tag: false,
      }
    });
  },

  render() {
    return (
      <div className="ar-nav">
        <Link to="/archives" className="all nav-link">全部文章（{this.state.count}）</Link>
        <div className="switch nav-link">
          <a 
            href="javascript:;" 
            className="nav-down"
            onClick={this.openPanel.bind(null, 'date')}
          >日期</a>
          {
            this.state.loadPanel.date ? 
            <DatePanel
              open={this.state.open.date}
            />
            :
            ''
          }
        </div>
        <div className="switch nav-link">
          <a
            href="javascript:;" 
            className="nav-down"
            onClick={this.openPanel.bind(null, 'tag')}
          >标签</a>
          {
            this.state.loadPanel.tag ? 
            <TagPanel
              open={this.state.open.tag}
            />
            :
            ''
          }
        </div>
      </div>
    )
  }

});

export default ArchiveNav;