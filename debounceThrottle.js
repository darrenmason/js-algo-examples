// debounce and throttle for frontend event rate control

function debounce(fn, wait, options = {}) {
  let timeout = null;
  const { leading = false, trailing = true } = options;

  return function debounced(...args) {
    const callNow = leading && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      if (trailing) {
        fn.apply(this, args);
      }
    }, wait);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

function throttle(fn, wait, options = {}) {
  let lastCall = 0;
  let timeout = null;
  let lastArgs = null;
  const { leading = true, trailing = true } = options;

  return function throttled(...args) {
    const now = Date.now();
    if (!lastCall && !leading) {
      lastCall = now;
    }
    const remaining = wait - (now - lastCall);
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      fn.apply(this, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        lastCall = leading ? Date.now() : 0;
        timeout = null;
        fn.apply(this, lastArgs);
      }, remaining);
    }
  };
}

// example usage:
// window.addEventListener("resize", throttle(() => console.log("resize"), 200));
// input.addEventListener("input", debounce((e) => search(e.target.value), 250));

