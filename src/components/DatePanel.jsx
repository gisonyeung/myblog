import React from 'react';
import { Link } from 'react-router';
import ArchiveStore from '../stores/ArchiveStore';
import ArchiveAction from '../actions/ArchiveAction';

const DatePanel = React.createClass({

  getInitialState() {

    let currentYear = ArchiveStore.getSiteYear().currentYear;
      
    ArchiveAction.fetchYearBlogs(currentYear);
    ArchiveAction.fetchSiteYear();

    return {
      yearBlogs: ArchiveStore.getYearBlogs(),
      siteYear: ArchiveStore.getSiteYear(),
      headerYear: currentYear,
    };

  },

  componentDidMount() {
    ArchiveStore.addChangeListener('YEARBLOG_LIST', this.updateDate);  
    ArchiveStore.addChangeListener('SITE_YEAR', this.updateSiteYear);  
  },

  componentWillUnmount() {
    ArchiveStore.removeChangeListener('YEARBLOG_LIST', this.updateDate);          
    ArchiveStore.removeChangeListener('SITE_YEAR', this.updateSiteYear);          
  },

  updateDate() {

    this.setState({
      yearBlogs: ArchiveStore.getYearBlogs(),
    });
  },

  updateSiteYear() {

    this.setState({
      siteYear: ArchiveStore.getSiteYear(),
      headerYear: ArchiveStore.getSiteYear().currentYear,
    });

  },

  switchPanel(num) {

    const that = this;

    // 请求列表
    ArchiveAction.fetchYearBlogs(this.state.headerYear + num);

    this.setState({
      headerYear: that.state.headerYear + num,
    });
  },



  render() {

    const that = this;

    const monthKey = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];

    function fillZero(number) {
      number = parseInt(number, 10) < 10 ? '0' + number : number; 
    };

    return (
      <div className={`ar-panel date ${this.props.open ? 'open' : ''}`}>
        <h2 className="year">
          {
            this.state.headerYear == this.state.siteYear.beginYear ?
            ''
            :
            <i 
              className="icon icon-arleft" 
              onClick={this.switchPanel.bind(null, -1)}
            />
          }
          <Link to={`/archives?type=date&date=${that.state.headerYear}`}>{this.state.headerYear}</Link>
          {
            this.state.headerYear == this.state.siteYear.currentYear ?
            ''
            :
            <i 
              className="icon icon-arright" 
              onClick={this.switchPanel.bind(null, 1)}
            />
          }
        </h2>
        <div className="date-list clearfix">
        {
          monthKey.map(function(key, index) {
            return (
              that.state.yearBlogs[key] > 0 ?
              <Link 
                to={`/archives?type=date&date=${that.state.siteYear.currentYear}${key}`} 
                className="date-item"
                key={index}
              >
                <h3>{index + 1}月</h3>
                <p className="number">{that.state.yearBlogs[key]}</p>
              </Link>
              :
              <div
                className="date-item disabled"
                key={index}
              >
                <h3>{index + 1}月</h3>
                <p className="number">0</p>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

});

export default DatePanel;