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
// import "highlight.js/styles/Vs2015.css";
import classnames from "classnames";
import Navigationtop from "~/src/components/NavigationTop/NavTop";

export default function PostPage({
  frontmatter: { title, date, img },
  slug,
  content,
}) {
  const dispatch = useDispatch();

  // ----
  // 目录生成
  // 处理和生成目录树
  const catatlogList = handleMarkdown(marked(content));

  // 跳转锚点

  const scrollToAnchor = (anchorId) => {
    if (anchorId) {
      let anchorElemnt = document.getElementById(anchorId);
      if (anchorElemnt) {
        anchorElemnt.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  //---

  useEffect(() => {
    // 用于处理异步操作取消绑定

    let isMounted = false;

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


    return () => {
      isMounted = true;
    };
  }, [dispatch, img, content, title]);

  return (
    <Layout>
      <Navigationtop></Navigationtop>
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

        {/* 目录 */}

        <div className={styles.catalogLinkContainer}>
          <div className={styles.catalogLinks}>
            {catatlogList.map((item) => {
              return (
                <span
                  className={styles.catalogLink}
                  key={item.text}
                  onClick={() => scrollToAnchor(item.link)}
                  data-type={item.type}
                >
                  {item.text}
                </span>
              );
            })}
          </div>
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

  console.log("paths",paths)

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
