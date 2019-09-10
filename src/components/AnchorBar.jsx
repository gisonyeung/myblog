import React from 'react';
import smoothScroll from '../utils/smoothScroll';

require('../sass/AnchorBar.scss');
import BlogStore from '../stores/BlogStore';


const AnchorBar = React.createClass({

  getInitialState() {

    return {
      menuList: [],
      activeIndex: '0'
    };

  },

  componentDidMount() {
    BlogStore.addChangeListener('BLOG_DETAIL', this.reloadMenuListWithTimer);
    this.bindScrollListener();
  },

  componentWillUnmount() {
    BlogStore.removeChangeListener('BLOG_DETAIL', this.reloadMenuListWithTimer);
    this.unbindScrollListener();
  },

  reloadMenuListWithTimer() {
    setTimeout(() => {
      this.reloadMenuList();
    }, 100);
  },

  reloadMenuList() {
    let $h1 = document.querySelectorAll('.content h1');
    let $h2 = document.querySelectorAll('.content h2');
    let $headers = Array.prototype.concat.call(...$h1, ...$h2);

    if (!$headers.length) return;

    // 根据 offsetTop 排序，形成数据结构，并基于这个高度，后续绑定scroll时判断阅读到哪里
    Array.prototype.sort.call($headers, (a, b) => a.offsetTop - b.offsetTop);
    // 第一项为文章标题，不加入列表
    $headers.shift();

    let menuList = [];
    let subMenuList = [];
    Array.prototype.forEach.call($headers, (item, index) => {
      let menuItem = {
        text: item.textContent,
        top: item.offsetTop,
      };

      item.tagName == 'H1' ? menuList.push(menuItem) : subMenuList.push(menuItem)

      if ((!$headers[index + 1] || $headers[index + 1].tagName == 'H1') && subMenuList.length) {
        menuList.push(subMenuList);
        subMenuList = []
      }
    });

    this.setState({
      menuList
    })
  },

  bindScrollListener() {
    const edgeDistance = 100;
    const scrollHandler = () => {
      let currentScrollTop = document.documentElement.scrollTop + document.body.scrollTop;
      let activeIndex = '0';
      this.state.menuList.forEach((item, index) => {
        if (!item.length) {
          if (currentScrollTop > (item.top - edgeDistance)) {
            activeIndex = index + ''
          }
        } else {
          item.forEach((subItem, subIndex) => {
            if (currentScrollTop > (subItem.top - edgeDistance)) {
              activeIndex = index + '-' + subIndex
            }
          })
        }
      })

      this.setState({
        activeIndex
      })
    }

    window.addEventListener('scroll', scrollHandler);
    window.$$unbindScrollListener = () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  },

  unbindScrollListener() {
    window.$$unbindScrollListener();
  },

  jumpToAnchor(menuItem) {
    smoothScroll(menuItem.top + 100)
  },

  render() {
    if (this.state.menuList.length == 0) return null;

    return (
      <div className="anchor-bar shadow-1">
        <ul>
          {
            this.state.menuList.map((item, index) => !item.length ?
              <li key={index}><a className={index + '' === this.state.activeIndex ? 'active' : ''} onClick={this.jumpToAnchor.bind(this, item)}>{item.text}</a></li>
              :
              <ul key={index}>
                {
                  item.map((menuItem, subIndex) => <li key={index + '-' + subIndex}><a className={index + '-' + subIndex === this.state.activeIndex ? 'active' : ''} onClick={this.jumpToAnchor.bind(this, menuItem)}>{menuItem.text}</a></li>)
                }
              </ul>
            )
          }
          </ul>
      </div>
    )
  }

});

export default AnchorBar;