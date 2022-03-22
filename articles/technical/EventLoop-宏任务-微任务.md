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

## 进入正题



### 宏任务与微任务有啥区别?

