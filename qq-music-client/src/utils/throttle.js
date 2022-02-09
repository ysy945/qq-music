//时间到了才执行
export default function throttle(fn, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn(...args);
      }, wait);
    }
  };
}
