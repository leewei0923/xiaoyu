## 前言 🧨



## 功能完成情况 🎞

> 样式



> 具体功能



## 功能进度日志 🎞

- 2.14
- [x] component --- header 
- [x] component --- main 
- [x] component --- footer
- [ ] 美化滚动条
- [ ] 

## 安装依赖 ✨

**sass**

```shell
npm install sass
```

```js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

**markdown支持**

```shell
npm install front-matter remark remark-html --save
```

使用 --- 来定义markdown 

安装gray-matter

```shell
npm install gray-matter
```



## 小知识🎁

### next.js 渲染markdown文件基础实践

- 将要使用到的插件

```
gray-matter , marked
```

```shell
npm i gray-matter --save
```

```shell
npm i marked --save
```

- 起步

**以ESM的方式引用包**

```js
import fs from "fs";  
import path from "path"; 
import matter from "gray-matter"; 
import { marked } from "marked"; // 4.0 以上的版本这样引用
```



```js
export async function getStaticPaths() {
  // 读取目录articles 处的文件 
  const files = fs.readdirSync(path.join("articles"));
    // 获取articles的文件名替换掉md 生成slug
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
    // 返回 
  return {
    paths,
    fallback: false,
  };
}
```



```js
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("articles", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // console.log("slug:", slug);
  // console.log("fo:", frontmatter);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
```

**完整代码**

```js
import fs from "fs";  
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return <>
    <p>{title}</p>
    <div>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
    
  </>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("articles"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  // console.log("paths",paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("articles", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // console.log("slug:", slug);
  // console.log("fo:", frontmatter);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

```

## 遇到问题 😣

- next.js 加载"fs" , "stream"等出现 can't found module

```js
2.2 在服务侧按需引入
若不方便将代码执行路径引导到服务端的文件。我们可以在服务侧按需引入，然后在 next.config.js 中配置不要打包到浏览器端。

export default function App {

};

export async function getStaticProps() {
  const Polaris = require('@tencent/polaris');
  console.log(Polaris);
  return {};
}
getStaticProps()方法在 NextJs 中，就是服务端运行的方法。我们在这里面使用require()来按需引入。

接着在 next.config.js 中：

const withAntdLess = require('next-plugin-antd-less');

module.exports = (phase) =>
  withAntdLess({
    webpack: (cfg, { isServer, webpack }) => {
      const config = cfg;

      if (!isServer) {
        // 在浏览器端，忽略这些模块的打包
        const ignoreList = ['@tencent\\/polaris', 'dns', 'dotenv'];
        ignoreList.forEach((n) => {
          config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: new RegExp(n) }));
        });
      }

      return config;
    },
  });
```

具体网址: https://www.xiabingbao.com/post/react/nextjs-server-client-build-qxpzwi.html

其他问题: https://www.cnblogs.com/universe-cosmo/p/10987778.html

- nextjs 中图片如何按照百分比来显示图

方法一:

```js
<Image src={image.url} alt={image.title} width="100%" height="100%" layout="responsive" objectFit="contain"/>
```

方法二:

```js
<Image src={image.url} alt={image.title} width="100vw" height="100%" layout="responsive" obj
```

- scss 中怎么使用媒体查询

```css
.sidebar {
  width: 300px;
  @media screen and (min-width: 720px){
    width: 500px;
  }
}
```



- 如何美化 css 滚动条

```css
::-webkit-scrollbar {
		  width: 15px;
	} /* 这是针对缺省样式 (必须的) */
```



```css
	::-webkit-scrollbar-track {
		  background-color: #b46868;
	} /* 滚动条的滑轨背景颜色 */

	::-webkit-scrollbar-thumb {
		  background-color: rgba(0, 0, 0, 0.2); 
	} /* 滑块颜色 */

	::-webkit-scrollbar-button {
		  background-color: #7c2929;
	} /* 滑轨两头的监听按钮颜色 */

	::-webkit-scrollbar-corner {
		  background-color: black;
	} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
```



- Window pageXOffset 和 pageYOffset 属性

```
pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素。

pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

pageXOffset 和 pageYOffset 属性相等于 scrollX 和 scrollY 属性。
```

- html 页面高度



![页面高度](https://images2018.cnblogs.com/blog/1136895/201806/1136895-20180630152939415-67541927.png)

```

```



- classnames 引用错误

**import classnames from 'classnames'  注意！此处classnames的值跟后面的对象名要保持一致。**



- 使用marked出现错误

引用的时候出错

```js
import  marked  from 'marked'; // 会报错
import { marked } from 'marked'; // 正确
```

