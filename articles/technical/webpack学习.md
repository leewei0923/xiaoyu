---
title: webpack学习记录
tags: [webpack]
authors: leewei
date: 2022.04.10
description: 刚接触webpack，遇到这个配置有些吐了，太难配置了
---



## alias 别名设置

[官方文档](https://webpack.js.org/configuration/resolve/)

使用alias会结合jsconfig，在vscode中配置了jsconfig是本地可以识别该文件。

```js
{
  "compilerOptions": {  
    "baseUrl": ".",  // 表示当前为根目录
    "paths": {    
      "~/*": ["src/*"], // 
    }
  }
}
```

