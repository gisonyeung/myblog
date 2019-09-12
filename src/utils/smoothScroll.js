/**
 * rAF 实现滚动条动画
 */

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const smoothScroll = (y = 0, duration = 150, $container = window) => {
  let isContinue = true;
  y = Math.max(y, 0);
  duration = Math.max(duration, 0);

  if (duration == 0) {
    return $container.scrollTo(0, y);
  }

  let currentScrollTop = $container == window ? (document.body.scrollTop + document.documentElement.scrollTop) : $container.scrollTop;
  let eachStepDistance = (y - currentScrollTop) * 16 / duration

  if (currentScrollTop == y) return () => { isContinue = false };

  function step() {
    if (!isContinue) return;

    let currentScrollTop = $container == window ? (document.body.scrollTop + document.documentElement.scrollTop) : $container.scrollTop;
    let currentBottomPlace = $container == window ? 
      (document.body.scrollTop + document.documentElement.scrollTop + window.innerHeight) :
      ($container.scrollTop + $container.innerHeight);
    let containerScrollHeight = $container == window ? document.body.scrollHeight : $container.scrollHeight;

    $container.scrollTo(0, currentScrollTop + eachStepDistance);

    if (Math.abs(y - currentScrollTop) > Math.abs(eachStepDistance)
      && currentBottomPlace != containerScrollHeight
      && currentScrollTop != 0) {
      requestAnimationFrame(step);
    } else {
      $container.scrollTo(0, y);
    }
  }

  requestAnimationFrame(step);

  return () => {
    isContinue = false;
  }
}

export default smoothScroll;