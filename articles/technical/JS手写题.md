---
title: JS手写题
tags: [javascript]
authors: leewei
date: 2022.04.26
description: 手写题还是挺重要的，也会经常碰到它，今天特地来学习手写一下。
---



## 深拷贝(deepclone)

什么是深拷贝：

- 判断类型，正则和日期直接返回新对象
- 空或者非对象类型，直接返回原值
- 考虑循环引用，判断如果hash中含有直接返回hash中的值
- 新建一个相应的new obj.constructor加入hash
- 遍历对象递归(普通key和key是symbol情况)

```js
function deepclone(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }

    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "Object" ? deepclone(obj[key]) : obj[key];
        }
    }

    return newObj;
}
```



## Promise

```
```







- 实现MyPomise状态与结果管理

  ```js
  // 定义三个常量表示状态
  
  const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  
  
  class MyPromise {
    constructor(executor) {
      // executor 是一个执行器，进入会立即执行
      executor(this.resolve, this.reject);
    }
  
    // 储存状态的变量,初始值是 pending
    ststus = PENDING;
  
    // reslove 和 reject 使用箭头函数避免this指向window 或 undefined
    // 用箭头函数可以让this执行当前实例对象
  
    // 成功之后的值
    value = null;
  
    // 失败后的原因
    reason = null;
  
    // resolve 更改成功后的对象
    resolve = (value) => {
      // 只有状态时等待，才执行状态修改
      if(this.ststus === PENDING) {
        // 状态修改为成功
        this.ststus = FULFILLED;
  
        // 保存成功之后的值
        this.value = value;
      }
    };
  
    // 更改失败后的状态
  
    reject = (reason) => {
  
      // 只有状态是等待，才执行状态修改
      if(this.ststus === PENDING) {
        // 状态为失败
        this.ststus = REJECTED;
  
        // 保存失败后的值
        this.reason = reason;
      }
    };
  }
  ```

- then 的简单实现

```js
then(onFulfilled, onRejected) {
    // 判断状态
    if(this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if(this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
```



第一步完整代码

```js
// 定义三个常量表示状态

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    executor(this.resolve, this.reject);
  }

  // 储存状态的变量,初始值是 pending
  status = PENDING;

  // reslove 和 reject 使用箭头函数避免this指向window 或 undefined
  // 用箭头函数可以让this执行当前实例对象

  // 成功之后的值
  value = null;

  // 失败后的原因
  reason = null;

  // resolve 更改成功后的对象
  resolve = (value) => {
    // 只有状态时等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;

      // 保存成功之后的值
      this.value = value;
    }
  };

  // 更改失败后的状态

  reject = (reason) => {

    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态为失败
      this.status = REJECTED;

      // 保存失败后的值
      this.reason = reason;
    }
  };

  // 

  then(onFulfilled, onRejected) {
    // 判断状态
    if(this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if(this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
}


module.exports = MyPromise; // 对外暴露
```

简单测试

```js
const MyPromise = require("./promise");

const p = new MyPromise((resolve, reject) => {
  resolve("success");
  reject("err");
})
 
p.then((value) => {
  console.log(value);
}, reason => {
  console.log(reason)
})


// result: success
```



- 简单处理异步问题

```js
// 存储成功回调
  onFulfilledCallback = null;

  // 存储失败回调
  onRejectedCallback = null;
```

**resolve**

```js
 // resolve 更改成功后的对象
  resolve = (value) => {
    // 只有状态时等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;

      // 保存成功之后的值
      this.value = value;

      // ==== 新增 ====
      // 判断成功回调是否存在，如果存在就调用
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  };

```

**reject**

```js

  // 更改失败后的状态

  reject = (reason) => {

    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态为失败
      this.status = REJECTED;

      // 保存失败后的值
      this.reason = reason;

      // ==== 新增 =====
      this.onRejectedCallback && this.onRejectedCallback(reason);
    }
  };
```

**then**

```js
 then(onFulfilled, onRejected) {
    // 判断状态
    if(this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if(this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    } else if(this.status === PENDING) {
      // ==== 新增====
      // 将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected;
    }
  }
```

**测试**

```js
const MyPromise = require("./promise");

const p = new MyPromise((resolve, reject) => {
  
  setTimeout(() => {
    resolve('success');
  }, 2000)
})
 
p.then((value) => {
  console.log(value);
}, reason => {
  console.log(reason)
})

// 2秒后执行 success
```

- 实现then方法的链式调用

**then**

```js
  
class MyPromise {
then(onFulfilled, onRejected) {
    // ===== 新增 ===========

    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        reslovePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });
    return promise2;
  }

}

// 在class 外添加
function reslovePromise(x, reslove, reject) {
  // 判断x 是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行x, 调用then方法, 目的是将其状态变为 fulfilled 或者 rejected
    x.then(reslove, reject);
  } else {
    reslove(x);
  }
}
```

**测试**

```js
const MyPromise = require("./promise");

const p = new MyPromise((resolve, reject) => {
  resolve("success");
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other');
  })
}

p.then(
  (value) => {
    console.log(1);
    console.log(value);
    return other();
  },
  (reason) => {
    console.log(reason);
  }
).then(
  (value) => {
    console.log(2);
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
)

// 
// 1
// success
// 2
// other
```

完全但是又不完整的代码,没经过测试

```js
// 定义三个常量表示状态

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 储存状态的变量,初始值是 pending
  status = PENDING;

  // resolve 和 reject 使用箭头函数避免this指向window 或 undefined
  // 用箭头函数可以让this执行当前实例对象

  // 成功之后的值
  value = null;

  // 失败后的原因
  reason = null;

  // 存储成功回调
  // onFulfilledCallback = null;
  onFulfilledCallbacks = [];
  // 存储失败回调
  // onRejectedCallback = null;
  onRejectedCallbacks = [];

  // resolve 更改成功后的对象
  resolve = (value) => {
    // 只有状态时等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;

      // 保存成功之后的值
      this.value = value;

      // 判断成功回调是否存在，如果存在就调用
      // 循环调用，直到所有的成功回调拿出来执行

      // this.onFulfilledCallback && this.onFulfilledCallback(value);

      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素, 然后() 调用, shift不是纯函数，取出后数组将失去该元素。
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  // 更改失败后的状态

  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态为失败
      this.status = REJECTED;

      // 保存失败后的值
      this.reason = reason;

      // this.onRejectedCallback && this.onRejectedCallback(reason);

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  //

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    // ===== 新增 ===========

    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        // 获取成功回调函数的执行结果
      } else if (this.status === REJECTED) {
        // =============== 新增

        queueMicrotask(() => {
          try {
            // 调用失败回调, 并且吧原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 调用失败回调并且把原因返回
              const x = onRejected(this.reason);

              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }

  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回

    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }

  // reject 方法

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断x 是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行x, 调用then方法, 目的是将其状态变为 fulfilled 或者 rejected
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;

```

