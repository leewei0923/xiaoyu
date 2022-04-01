---
title: react 开发谷歌插件
tags: [react]
authors: leewei
date: 2022.03.31
description: 前面用jQuery写过谷歌插件，现在将原先项目重构，新技术打算采用TS + react ,从0到0+
---



## 技术栈

- React | Router
- TypeScript
- Vite(构建工具)
- 谷歌插件API
- Less



### React

1. 安装依赖及附属文件

```shell
npm i react react-dom react-redux typescript --save

npm i react@17.0.2 react-dom@17.0.2 react-redux@7.2.6 typescript --save
```

- `react` 17.0.2
- `react-dom` 17.0.2
- `react-redux` 7.2.6
- `typescript` 4.6.3

**tsconfig.json配置**

```json
{
  "compilerOptions": {
    "target": "es5",  // 编译的目标
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "preserve",
    "baseUrl": "./",
    "paths": {
      "@": ["src/"]
    }
  },
  "include": ["./src/**/*"]
}
```



2.安装@types声明库

```shell
npm i @types/react @types/react-dom @types/react-redux --save-dev
```



3.  安装webpack

```shell
npm i webpack webpack-cli --save-dev
```

- "webpack": "^5.70.0",

- "webpack-cli": "^4.9.2"

4. 安装`clean-webpack-plugin ` 用于清理之前打包的文件

```shell
npm i clean-webpack-plugin --save
```

5. 安装`fork-ts-checker-webpack-plugin`  强制类型检查

6. 安装 `copy-webpack-plugin` 将打包后的文件另存
7. `postcss-loader`
8. `mini-css-extract-plugin`
9. `cross-env`
10. css-minimizer-webpack-plugin
11. webpack-bundle-analyzer