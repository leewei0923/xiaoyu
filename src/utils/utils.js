// leewei 22.02.19 额外的小代码
import md5 from "blueimp-md5";

// 防抖

const Debounce = (fn, wait) => {
  let timer = null;
  return (...argumens) => {
    const context = this;
    const args = argumens;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};

const UseDebounce = (fn, wait) => {
  return Debounce(fn, wait);
};

// 节流
const Throttle = (fn, time) => {
  let curtime = Date.now();

  return () => {
    const context = this;
    const agrs = argumens;
    const nowTime = Date.now();

    if (nowTime - curtime >= time) {
      curtime = Date.now();
      return fn.apply(context, agrs);
    }
  };
};

// 加密
const onEncrypt = (str, key) => {
  if (typeof str === "string") {
    return md5(str, key ?? "");
  } else {
    return "md5 err";
  }
};

const generateID = (str) => {
  return onEncrypt(str);
};

export { Throttle, Debounce, UseDebounce, onEncrypt, generateID };
