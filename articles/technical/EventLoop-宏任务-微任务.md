---
title: EventLoop、宏任务、微任务
tags: [javascript, node]
authors: leewei
date: 2022.03.22
description: 用通俗易懂的语言阐述EventLoop
---

## 前言

大二下的暑假我碰到一个EventLoop面试题，当时回答的执行结果出错了。那个时候我还有些不懂，后面反问面试官的时候，提到这个问题。她告诉我这个是EventLoop的问题。过去，我面试没啥概念，现在好一点。开始复现我的问题。

```js
console.log(1);
Promise.resolve(console.log(2));
console.log(3)
setTimeout(() => {
    console.log(4)
}, 0);
console.log(5);

// 1, 2, 3, 5, 4

```

### 浏览器中的事件循环

浏览器中除了依靠函数调用栈来维持函数的执行顺序外，还依靠任务队列（task queue) 来维持另外一些代码的执行.整个执行的过程被称为事件循环。下图是浏览器中事件循环。

![浏览器事件循环](https://qi.7miaoyu.com/typora/浏览器事件循环.png)

执行宏任务，然后执行该宏任务产生的微任务，如果任务在执行过程中产生了新的微任务，，继续执行微任务，微任务执行完毕后，再回到下一轮的循环。

```js
// 以下代码建议在谷歌浏览器的snippet 中执行

async function async1() {
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2 end")
}

async1();

setTimeout(() => {
   console.log('setTimeout') 
},0)

new Promise(resolve => {
    console.log('Promise');
    resolve();
})
.then(function() {
    console.log('promise1')
})

.then(function() {
    console.log('promise2')
})

// async2 end
// Promise
// async1 end
// romise1
// promise2
// setTimeout
```



## async/await 执行顺序

async隐式返回Promise作为结果的函数。await后面的函数执行完毕时，await会产生一个微任务(Promise.then是微任务)。但是这个微任务执行完await之后，直接跳出async函数，其他代码执行完毕后，回到async函数中去执行剩下的代码

```js
console.log('script start')
async function async1() {
   await async2();
   console.log('async1 end');
} 

async function async2() {
   console.log('async2 end');
   return Promise.resolve().then(()=> {
      console.log('async2 end1')
   })
}

async1();

setTimeout(function() {
   console.log('setTimeout');
},0)

new Promise(resolve => {
   console.log('Promise');
   resolve();
})
.then(function() {
   console.log('Promise1')
})
.then(() => {
   console.log('Promise2')
})

console.log('script end')

// script start
// async2 end
// Promise
// script end
// async2 end1
// Promise1
// Promise2
// async1 end
// undefined
// setTimeout
```

此时执行完await并不是先把后面的代码注册到微任务队列中,指向完await之后，跳出async1函数，执行其他代码，遇到promise的时候，把promise.then注册为微服务，其他代码执行完毕后，需要回到async1函数中去执行剩下的代码，再把await后面的代码注册到微服务的队列中。此时微任务是有之前注册的微任务，遇到这种情况，先执行除了async1函数之外的微任务（promise1，promise2），然后才执行async1内注册的微任务async1，



## Node事件循环



![node事件循环](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/2/1709951e658af197~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

上图中每个框为事件循环机制的一个阶段，每个阶段都有一个FIFO的队列来执行回调，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数。

```
node 事件循环的阶段顺序为
输入数据阶段(incoming data)
轮询阶段(poll)
检查阶段(check)
关闭事件阶段(close callback)
定时器检测阶段(timers)
I/O事件回调阶段(I/O callback)
闲置阶段(idle prepare)
轮询阶段...

```

