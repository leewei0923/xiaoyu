---
title: typescript
tags: [前端, typescript]
authors: leewei
---

## 类型声明

### 常用基础类型概述

- 原始类型: number, string, boolean, null, undefined, symbol
- 对象类型: Object(数组, 对象, 函数)，枚举，void，any等

### TS新增类型

- 联合类型: 自定义类型(类型别名) ,接口, 

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
let numbers:number[] = [1,2,3,4]
let strings: Array<string> = ['1','f','f'] 
```

### 元组

```typescript
语法:
:[类型, 类型]
let t:[string, string] = ['a', 'a'];
```

**既有number又有string类型**

联合类型

```js
let strings: (number|string)[] = ['1','f',4]
let strings: (number | string | boolean)[] = ["1", "f", 4, true];

// 不添加括号，既是某个类型又是另个类型
```



### 枚举

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



### 类型别名—— type

当一个类型比较复杂的情况下，可以使用类型别名

```js
type CustomArray = (number | string)[];

let arr:CustomArray = [1,2,3,'4']
```



### 函数类型

给参数和返回值添加类型

```js
function add(n1: number, n2: number): number {
  return n1 + n2;
}

console.log(add(5, 6));
```



### void 类型

```js
function add(n1: number, n2: number):void {
  console.log(n1 + n2);
}
```

### 函数可选参数

**可选参数只能放在参数的最后**

```js
// 可选参数只能放在参数的最后
function add(n1: number, n2: number, n3?: number): void {
  console.log(n1 + n2 + (n3 || 0));
}

add(1, 2, 3); // 6

add(1,2); // 3
```

### 对象类型

```js
let person = {
  name: "小米",
  age: 10,
};
// 多行可以用封号，也可以什么都不加

let prson2: {
  name: string;
  sayHi(str: string): void;
  print: () => string;
} = {
  name: "小米",
  sayHi(str) {},
  print() {
    return "";
  },
};

```



### 接口——interface

1. 使用`interface`关键字来声明接口
2. 接口名称可以是任意合法的变量名称
3. 声明接口后，直接使用接口名称作为变量的类型
4. 因为每一行只有一个属性类型，因此，属性类型后没有；(分号)

```js
interface IPerson {
  name: string;
  age: number;
  sayHi(): void;
}

let person: IPerson = {
  name: "jack",
  age: 9,
  sayHi() {},
};

```

### 接口和类型别名的对比

- 相同点
  - 都可以给对象指定类型
- 不同点
  - 接口只能给对象指定类型
  - 类型别名，不仅可以给对象指定类型，实际上也可以为任意类型指定别名

有两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用。

两个接口都有想x，y两个属性，重复写两次，可以，但很繁琐。

```js
// bad
interface Point2D {x: number, y:number}
interface Point3D {x:number, y:number; z:number}

// good
interface Point2D {x:number,; y:number}
interface Point3D extends Point2D {z:number}
```

1. 使用extends（继承）关键字实现了接口Point2D的继承

2. 继承后，Ponit3D就有了Ponit2D的所有属性和方法（此时，Point3D同时有想，x，y，z三个属性）

   

### 高级类型

- class类
- 类型兼容性
- 交叉类型
- 泛型和keyof
- 索引签名类型和索引查询类型
- 映射类型

### class

- readonly

  除了可见修饰符外，还有一个常见的修饰符就是：readonly（制度修饰符）

  readonly：表示只读，用来防止在构造函数之外对属性进行赋值

  必须要指定类型
  
  接口或者{}表示的对象类型，也可以使用readonly

- 类型继承
  - 通过implements关键字让class实现接口
  - Person类实现接口Singable意味着，Personal类中必须提供Singable接口中指定的所有方法和属性

```js
interface Singale {
  sing():void
}

class Person implements Singale {
  sing(): void {
    
  }
}
```



### 交叉类型

**交叉类型（&）**：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用与对象类型）

使用交叉类型后，新的类型PersonDetail就同时具备了Person和contact的所有属性类型



### 泛型

调用泛型

```js
function id<Type>(value: Type): Type {
  return value;
}

const num = id<number>(10);
1. 语法: 在函数名称的后面添加<>(尖括号),尖括号中指定具体的类型，比如，此处number。
2. 当传入类型number后，这个类型就会被函数声明时指定的类型变量Type捕获到
3. 此时，Type的类型就是number，所以，函数id参数和返回值的类型也都是number
```

同样，如果传入类型string，函数id参数和返回值的类型就都是string

这样，通过泛型做到了让id函数与多种不同的类型一起工作，实现了复用的同时保证了类型安全

- 泛型约束

​	**泛型约束**：默认情况下，泛型函数的类型变量Type可以代表多个类型，这个导致无法访问任何属性，比如，id（‘a') 调用函数时获取参数的长度。



Type可以代表任意类型，无法保证一定存在length属性，number类型中就没用length。此时就需要为泛型添加约束，收缩类型。



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



