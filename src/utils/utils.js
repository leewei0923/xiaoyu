// leewei 22.02.19 额外的小代码
import md5 from "blueimp-md5";
import { Base64 } from "js-base64";

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
//  base64 转换为 字符串
const decodeBase64 = (str) => {

  if(typeof str != 'string') {
    return "error"
  }
  return Buffer.from(str, "base64").toString("binary");
};
// 字符转换为 base64

const encodeBase64 = (str) => Base64.encode(str);

export {
  Throttle,
  Debounce,
  UseDebounce,
  onEncrypt,
  generateID,
  decodeBase64,
  encodeBase64,
};
