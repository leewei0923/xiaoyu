import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../src/components/Layout/Layout";
import Mains from "../src/components/Main/Main";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import bg from "../public/images/header-bg.jpg";
import { changeBgImg, pageTitleChange } from "../src/store/action";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import BackTop from "~/src/components/BackTop/BackTop";
import { apiArticleList } from "~/src/request/api";
export default function Home({ posts }) {
  const dispatch = useDispatch();
  const [articleList, setArticleList] = useState([]); // 文章列表
  const articlesLen = articleList.length;
  const [articlesCount, setArticleCount] = useState(5); // 加载页面的时候显示的文章数量

  // 加载数据
  const fetchData = async () => {
    const data = await apiArticleList();
    if (data.data.status == "ok") {
      const list = data.data.info;
      // 按照时间排序 最新排在最前面
      list.sort((a, b) => {
        return new Date(b.date[0]).getTime() - new Date(a.date[0]).getTime();
      });
      setArticleList(list);
    }
  };

  // 点击加载更多文章
  const addArticle = () => {
    if (articlesCount < articlesLen) {
      setArticleCount(articlesCount + 2);
    } else {
      setArticleCount(articlesLen);
    }
  };

  useEffect(() => {
    // 改变 主页背景的 背景图片
    dispatch(changeBgImg(bg.src));
    // 改变主页背景的 标题
    dispatch(pageTitleChange(`主页`));

    // 加载文章列表
    fetchData();
  }, [dispatch]);

  const loadMoreStyle = {
    visibility: articlesCount == articlesLen ? "hidden" : "visible",
    lineHeight: "20px",
    textAlign: "center",
    fontSize: "20px",
    padding: "10px",
    background: "#696969",
    color: "white",
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="no" />
      </Head>
      <Layout>
        {/*  */}
        <Navigationtop></Navigationtop>
        {/* 文章概要 */}
        <Mains posts={articleList.slice(0, articlesCount)}></Mains>
        <div onClick={() => addArticle()} style={loadMoreStyle}>
          加载更多
        </div>
        <BackTop />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // 获取articles 目录
  const files = [];
  const types = [];
  fs.readdirSync(path.join("articles")).map((dir) => {
    return fs.readdirSync(path.join(`articles/${dir}`)).map((file) => {
      files.push(`${dir}/${file}`);
      types.push(dir);
    });
  });

  // 获取 slug

  const posts = files.map((filename, index) => {
    // 创建slug
    const slug = filename.replace(".md", "");
    // 文章类型
    const type = types[index];

    // 获取 格式化内容

    const markdownWhiteMeta = fs.readFileSync(
      path.join("articles", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWhiteMeta);
    return {
      slug,
      type,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts,
    },
  };
}
