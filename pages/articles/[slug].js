import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Layout from "../../src/components/Layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBgImg, pageTitleChange } from "../../src/store/action";
import styles from "../../styles/postPage.module.scss";
import { handleMarkdown } from "../../src/utils/handleMarkdown";
import hljs from "highlight.js";
import "highlight.js/styles/Vs2015.css";

export default function PostPage({
  frontmatter: { title, date, img },
  slug,
  content,
}) {
  const dispatch = useDispatch();

  useEffect(() => {

    // 改变 header 图片背景
    dispatch(changeBgImg(img));

    // 改变 navTop 的标题
    dispatch(pageTitleChange(title));
    // 代码高亮

    // document.querySelectorAll("pre code").forEach((block) => {
    //   try {
    //     hljs.highlightElement(block);
    //   } catch (error) {
    //     consoel.log("NavPage 有错误", error);
    //   }
    // });


  }, [dispatch, img, content, title]);


  
  // console.log(handleMarkdown(marked(content)));
  return (
    <Layout>
      <div className={styles.postPage}>
        <div className={styles.articlesPost}>
          <div className={styles.articleTitle}>
            <p>{title}</p>
          </div>
          <div className={styles.meta}></div>
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </div>
      </div>
    </Layout>
  );
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
