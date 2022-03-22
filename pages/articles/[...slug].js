import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Layout from "../../src/components/Layout/Layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeBgImg, pageTitleChange } from "../../src/store/action";
import styles from "../../styles/postPage.module.scss";
import { handleMarkdown } from "../../src/utils/handleMarkdown";
import hljs from "highlight.js";
// import "highlight.js/styles/Vs2015.css";
import classnames from "classnames";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import BackTop from "~/src/components/BackTop/BackTop";
import MultiFunctionalMenu from "~/src/components/MultiFunctionalMenu/MultiFunctionalMenu";

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

  // 隐藏目录

  const [isCatalogHIde, setCatalogHide] = useState(true);

  const changeCatalogState = () => {
    setCatalogHide(!isCatalogHIde);
  }

  const catalogLinkContainer = classnames({
    [styles.catalogLinkContainer]: true,
    [styles.ZeroWidth]: isCatalogHIde,
  });

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

        <div className={catalogLinkContainer}>
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
      <BackTop />
      <MultiFunctionalMenu
        click={[changeCatalogState]}
        title={["目录"]}
        barState={[isCatalogHIde]}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = [];
  const slugs = [];
  fs.readdirSync(path.join("articles")).map((dir) => {
    return fs.readdirSync(path.join(`articles/${dir}`)).map((file) => {
      files.push([dir, file]);
    });
  });

  const paths = files.map((filename) => ({
    params: {
      slug: [filename[0], filename[1].replace(".md", "")],
    },
  }));


  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("articles", slug.join('/') + ".md"),
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
