---
title: css3阴影
tags: [前端,阴影]
authors: leewei
date: 2022.03.28
description: 写过很多阴影，但是阴影都不太真实，不太美观，现在想来深入了解一下。
---



```css
box-shadow: 10px 10px 5px #eee;
              x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色  |  阴影向内
box-shadow:  offset-x | offset-y | blur-radius | spread-radius | color |  inset;

```

<div style="width:100px;height:100px;box-shadow:2px 2px 4px  #eee"></div>

1）只写两个值, 那么这两个值为 offset-x和offset-y；

2）写了第三个值, 那么第三个值为blur-radius；

3）写了第四个值, 那么第四个值为spread-radius；

4）可选，inset关键字。

5）可选，color值。




## 语法

```css
/* offset-x | offset-y | color */
box-shadow: 60px -16px teal;
/* offset-x | offset-y | blur-radius | color */
box-shadow: 10px 5px 5px black;
/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
/* inset | offset-x | offset-y | color */
box-shadow: inset 5em 1em gold;
/* Any number of shadows, separated by commas */
/*任意数量的阴影，以逗号分隔*/
box-shadow: 3px 3px red, -1em 0 0.4em olive;
/* Global keywords */
/*继承父元素的值*/
box-shadow: inherit; 
/*初始化*/
box-shadow: initial;
box-shadow: unset;

```



## text-shadow文本阴影



文字的阴影用text-shadow属性实现，它的用法和box-shadow非常相似。

唯一的区别是text-shadow没有spread值也没有inset关键字。

它仅适用于文本节点。

![image-20220328153953269](https://qi.7miaoyu.com/typora/image-20220328153953269.png)

```css
 /*测试一*/
 text-shadow:2px 3px 6px #000;
 
 /*测试二*/
 text-shadow:2px 3px 1px #000;
```

<p style="text-shadow:2px 3px 6px #000">这是第一个测试</p>

<p style="text-shadow:2px 3px 1px #000">这是第二个测试</p>



## 多重阴影

```
一个元素可以使用多个阴影，多个阴影之间用逗号分隔；
```

<div style="width:100px;height:100px;box-shadow: 5px 5px 10px #FF00FF, -7px -4px 4px #FF9966;">多重阴影</div>

!::注意::

1）当给同一个元素使用多个阴影属性时，需要注意它的顺序，*最先写*的阴影将显示*在最顶层*;
2)、如果前面的阴影模糊值小于后面的阴影模糊值，那么前面的显示在后面之上，如果前面阴影的模糊值大于后面的阴影模糊值，那么前面的阴影将遮住后面的阴影效果。

## drop-shadow阴影

> 语法

```css
drop-shadow(offset-x offset-y blur-radius spread-radius color)
```

这个属性可以按照物体的轮廓附上阴影，而不是给物体所包围的盒子附上阴影。