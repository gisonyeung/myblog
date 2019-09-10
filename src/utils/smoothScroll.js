/**
 * rAF 实现滚动条动画
 */

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const smoothScroll = (y = 0, duration = 150) => {
  y = Math.max(y, 0);
  duration = Math.max(duration, 0);

  if (duration == 0) {
    return window.scrollTo(0, y);
  }

  let currentScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
  let eachStepDistance = (y - currentScrollTop) * 16 / duration

  if (currentScrollTop == y) return;

  function step() {
    let currentScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    let currentBottomPlace = document.body.scrollTop + document.documentElement.scrollTop + window.innerHeight;

    window.scrollTo(0, document.body.scrollTop + document.documentElement.scrollTop + eachStepDistance);

    if (Math.abs(y - currentScrollTop) > Math.abs(eachStepDistance)
      && currentBottomPlace != document.body.scrollHeight 
      && currentScrollTop != 0) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, y);
    }
  }

  requestAnimationFrame(step);
}

export default smoothScroll;