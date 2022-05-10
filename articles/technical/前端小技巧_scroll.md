---
title: 前端小技巧_scroll
tags: [前端]
authors: leewei
date: 2022.04.20
description: 近期写自己的一个小项目，包括之前写backtop的功能，滑轮滚动和scoll等问题，今天来归总一下#
---

## 横向滚动

```js
let container = document.querySelector(".container");
```

```js
container.addEventListener("wheel", (event) => {  
    event.preventDefault();  
    container.scrollLeft += event.deltaY;
});
```

- 这里利用到了 scrollLeft 属性，让容器的内容向左移动，这里只需要加上滚轮垂直滚动的距离差值就可以了，也就是 event 对象中的 deltaY 属性：