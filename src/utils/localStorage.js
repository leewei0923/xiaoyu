/**
 * 22.03.20 对localStorage封装
 */
import { encodeBase64, decodeBase64 } from "./utils";
// 添加
const addItem = (key, value, callback) => {
  window.localStorage.addItem(key, encodeBase64(value));
  return callback;
};

// 获取

const getItem = (key, callback) => {
  if (window.localStorage.getItem(key)) {
    const value = decodeBase64(window.localStorage.getItem(key));
    return { value: value, callback: callback };
  } else {
    return { value: null, callback: callback };
  }
};

// 删除
const removeItem = (key, callback) => {
  if (window.localStorage.getItem(key)) {
    window.localStorage.removeItem(key);
    return { msg: "ok", callback: callback };
  } else {
    return { msg: fail, callback: callback };
  }
};

export { addItem, getItem, removeItem };
