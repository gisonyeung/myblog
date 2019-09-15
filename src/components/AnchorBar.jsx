import React from 'react';
import smoothScroll from '../utils/smoothScroll';

require('../sass/AnchorBar.scss');
import BlogStore from '../stores/BlogStore';

let cancelRAF = () => {};

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

    setTimeout(() => {
      this.scrollPrevent();
    }, 2000);

    this.reloadMenuListWithTimer();
  },

  componentWillUnmount() {
    BlogStore.removeChangeListener('BLOG_DETAIL', this.reloadMenuListWithTimer);
    this.unbindScrollListener();
  },

  reloadMenuListWithTimer() {
    setTimeout(() => {
      this.reloadMenuList();
    }, 500);
  },

  reloadMenuList() {
    let $headers = document.querySelectorAll('.content h1, .content h2');
    
    if (!$headers.length) return;
    
    $headers = [].concat(...$headers);
    // 根据 offsetTop 排序，形成数据结构，并基于这个高度，后续绑定scroll时判断阅读到哪里
    Array.prototype.sort.call($headers, (a, b) => a.offsetTop - b.offsetTop);
    // 第一项为文章标题，不加入列表
    $headers.shift();

    let lastTop = -1;
    let menuList = [];
    let subMenuList = [];
    Array.prototype.forEach.call($headers, (item, index) => {
      let menuItem = {
        text: item.textContent,
        top: item.offsetTop,
      };

      // 去重
      if (lastTop == item.offsetTop) return;

      lastTop = item.offsetTop;
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
      let activeDomIndex = -1;
      this.state.menuList.forEach((item, index) => {
        if (!item.length) {
          if (currentScrollTop > (item.top - edgeDistance)) {
            activeIndex = index + '';
            activeDomIndex++;
          }
        } else {
          item.forEach((subItem, subIndex) => {
            if (currentScrollTop > (subItem.top - edgeDistance)) {
              activeIndex = index + '-' + subIndex;
              activeDomIndex++;
            }
          })
        }
      })

      this.setState({
        activeIndex
      });

      this.checkItemInViewport(activeDomIndex);
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
    smoothScroll(menuItem.top)
  },

  scrollPrevent() {
    const eventType = document.mozHidden !== undefined ? 'DOMMouseScroll' : 'mousewheel';
    const $menu = document.querySelector('.anchor-bar');

    if (!$menu) return;

    $menu.addEventListener(eventType, (event) => {
      let { scrollTop, scrollHeight, clientHeight } = $menu;
      let scrollEndHeight = scrollHeight - clientHeight;
      let delta = event.wheelDelta ? event.wheelDelta : -(event.originalEvent.delta || 0);

      // 无滚动条时不启动特性
      if (scrollHeight === clientHeight) return;

      if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollEndHeight - scrollTop <= -1 * delta)) {
        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
        $menu.scrollTop = delta > 0 ? 0 : scrollHeight;
        // 向上滚 || 向下滚
        event.preventDefault();
      }
    });
  },

  checkItemInViewport(index) {
    const $menu = document.querySelector('.anchor-bar');

    // 阅读面板高度小于面板最大高度，则跳过检查
    if (index == -1 || !$menu || $menu.innerHeight <= (window.innerHeight - 60)) return;

    const $lis = document.querySelectorAll('.anchor-bar li');
    const $li = $lis[index];

    cancelRAF();

    // 当前 index 处于前2或倒数第2时直接置顶或置底
    if (index <= 1) {
      return (cancelRAF = smoothScroll(0, 100, $menu));
    } else if (index >= $lis.length - 2) {
      return (cancelRAF = smoothScroll($menu.scrollHeight, 100, $menu));
    }
    
    // 说明还在视窗内
    if ($li.offsetTop >= $menu.scrollTop + 25 && $li.offsetTop <= $menu.scrollTop + $menu.offsetHeight - 50) return;
      
    // 在上方，那就往上微移，保持目标在顶部
    if ($li.offsetTop < $menu.scrollTop + 25) {
      cancelRAF = smoothScroll($li.offsetTop - 25, 100, $menu);
    } else { // 在下方，那就往下微移，保持目标在底部 
      cancelRAF = smoothScroll($li.offsetTop - $menu.offsetHeight + 50, 100, $menu);
    }
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