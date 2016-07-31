import React from 'react';
import { Route, Link } from 'react-router';
import BlogStore from '../stores/BlogStore';
import BlogAction from '../actions/BlogAction';

require('../sass/Pagination.scss');

const Pagination = React.createClass({



  getInitialState() {
    // 改成异步时，放到getInitialState
    BlogAction.fetchPages();
    return {
      allPages: this.props.query.page,
      pageNow: this.props.query.page,
    };

  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageNow: nextProps.query.page
    });  
  },

  componentDidMount() {

    BlogStore.addChangeListener('BLOG_PAGE', this.updatePageNum);
    

  },

  componentWillUnmount() {
       
    BlogStore.removeChangeListener('BLOG_PAGE', this.updatePageNum);

  },

  updatePageNum() {
    this.setState({
      allPages: BlogStore.getPageNum()
    });

  },

  render() {

    const prevPage = parseInt(this.state.pageNow, 10) - 1;
    const nextPage = parseInt(this.state.pageNow, 10) + 1;

    let items = [];
    for( let i = 2; i < this.state.allPages; i++) {
      if( i < prevPage || i > nextPage  ) {
        continue;
      }
      let item = '';
      item = <Link to={`?page=${i}`} key={i} className="page-number" activeClassName="active">{i}</Link>
      items.push(item);
    }

    return (
      <nav className="pagination">

        {
          this.state.pageNow == 1 ? '' : <Link to={`?page=${prevPage}`} className="pre-page">«</Link>
        }

        <Link to={`?page=1`} className="page-number" activeClassName="active">1</Link>

        {
          prevPage <= 2 ? '' : <span className="space">…</span>
        }

        { items }

        {
          nextPage >= this.state.allPages - 1 ? '' : <span className="space">…</span>
        }

        {
          this.state.allPages == 1 ? '' : <Link to={`?page=${this.state.allPages}`} className="page-number" activeClassName="active">{this.state.allPages}</Link>
        }
        
        {
          this.state.pageNow == this.state.allPages ? '' : <Link to={`?page=${nextPage}`} className="next-page">»</Link>
        }
      </nav>
    )
  }

});

export default Pagination;