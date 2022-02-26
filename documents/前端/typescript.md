---
title: typescript
tags: [前端, typescript]
authors: leewei
---

## 类型声明



| 类型    | 例子         | 描述                         |
| ------- | ------------ | ---------------------------- |
| number  | 1, 2, 3      | 任意数字                     |
| string  | "hi", "a"    | 任意字符串                   |
| boolean | true, false  | 布尔值                       |
| 字面量  | 其本身       | 限制变量的值就是该字面量的值 |
| any     | *            | 任意类型                     |
| unknown | *            | 类型安全的any                |
| void    | 空值         | 没有值                       |
| never   | 没有值       | 不能是任何值                 |
| object  | {}           | 任意js对象                   |
| array   | [1, 2, 3]    | 任意js数组                   |
| tuple   | [1, 2]       | 元素，固定长度数组           |
| enum    | enum（A，B） | 枚举                         |

### 数组

```typescript
let a:number[];
let g:Array<number>
```

元组

```typescript
语法:
:[类型, 类型]
let t:[string, string] = ['a', 'a'];
```

枚举

```typescript
enum Gender {
    Male: 
}
```



```typescript
// & 表示同时 连接两个对象
let j:{name: string} & {age: number} ;

j = {name: "小明", age: 30};

// 类型别名
type myType = string;
let k: 1 | 2 | 3;
let m: myType;
```



## ts编译选项

### tsconfig的配置

配置选项

- include 

  - 定义希望被编译文件所在的目录

  - 默认值 ["**/*"]

  - 示例

  - ```json
    "include":["src/**/*", "tests/**/*"]
    ```

  - 上述事例中，所有src目录下的文件都会被编译

- exclude

  - 定义需要排除在外的目录

  - 默认值： ["node_modules", "brower_components", "jspm_packages"]

  - 示例

  - ```
    "exclude":["./src/hello/**/*"]
    src下hello目录的文件不会被编译
    **: 任意目录
    *: 任意文件
    ```

- extends

  - 定义被继承的配置文件

  - ```
    "extends": "./configs/base"
    当前配置文件中会自动包含config目录下base.json中的所有配置信息
    ```

- file

  - 指定被编译文件的列表，只有需要编译的文件少时候才会使用
  - 



## 安装webpack



```shell
npm i -D webpack webpack-cli ts-loader
```

安装 html 解析插件

```shell
npm i -D html-webpack-plugin
```

安装webpack服务器

```shell
npm i -D webpack-dev-server
```

安装clean-webpack 用来清理已经生成的文件，保持文件处于最新的状态

```shell
npm i -D clean-webpack-plugin
```

安装babel

```shell
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

#### webpack 基本配置

```js
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// webpack 所有的配置信息
module.exports = {
  // 入口文件
  entry: "./src/index.ts",

  // 指定的打包后的文件

  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),

    // 打包后文件夹的文件
    filename: "bundle.js",

    // 环境设置
    environment: {
        arrowFunction: false
    }
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则

    rules: [
      {
        // test 规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        // 执行顺序是由后到前
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置 babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      "chrome": "88",
                    },
                    // 指定版本
                    corejs: "3",
                    // 使用corejs的方式 表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node_module/,
      },
    ],
  },

  // 配置Webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "ts测试网页",
    }),
  ],

  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};

```



