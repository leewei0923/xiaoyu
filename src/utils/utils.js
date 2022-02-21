 // leewei 22.02.19 额外的小代码


// 防抖

const Debounce = (fn, delay) => {
  let timer = null;
  return () => {
    if(timer != null) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
      fn();
    },delay)
  }
}


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


export {
  Throttle,
  Debounce
}