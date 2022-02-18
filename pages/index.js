import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../src/components/Layout/Layout";
import Mains from "../src/components/Main/Main";
import Head from "next/head";

export default function Home({ posts }) {
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
        {/* 文章概要 */}
        <Mains posts={posts}></Mains>
      </Layout>
      ;
    </>
  );
}

export async function getStaticProps() {
  // 获取articles 目录
  const files = fs.readdirSync(path.join("articles"));

  // 获取 slug

  const posts = files.map((filename) => {
    // 创建slug
    const slug = filename.replace(".md", "");

    // 获取 格式化内容

    const markdownWhiteMeta = fs.readFileSync(
      path.join("articles", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWhiteMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts,
    },
  };
}
