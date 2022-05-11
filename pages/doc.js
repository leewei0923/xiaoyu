import fs from "fs";
import path from "path";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pageTitleChange } from "~/src/store/action";
import styles from "~/styles/doc.module.scss";
import matter from "gray-matter";
import { marked } from "marked";
import { Collapse, Button } from "antd";
import { handleMarkdown } from "~/src/utils/handleMarkdown";
import BackTop from "~/src/components/BackTop/BackTop";
import hljs from "highlight.js";
import "highlight.js/styles/Vs2015.css";
import MultiFunctionalMenu from "~/src/components/MultiFunctionalMenu/MultiFunctionalMenu";
import classnames from 'classnames';
import Head from "next/head";


export default function Doc(props) {
  const dispatch = useDispatch();
  const { floderList } = props;
  // console.log(floderList);
  const { Panel } = Collapse;

  // 利用序号获取文章内容
  const [docIndex, setDocIndex] = useState([0, 0]);

  // 改变文章的序号
  const changeIndex = (first, second) => {
    setDocIndex([first, second]);
  };

  // ----
  // 目录生成
  // 处理和生成目录树

  const catatlogList = handleMarkdown(
    marked(floderList[docIndex[0]].child.content[docIndex[1]])
  );
 

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

  // 改变移动端导航栏状态

  const [isLeftHide, setLeftHide] = useState(true);

  const leftNav = classnames({
    [styles.leftNav]: true,
    [styles.ZeroWidth]: isLeftHide,
  });

  const changeLeftNav = () => {
    setLeftHide(!isLeftHide);
  }


  // 改变文章目录状态

  const [isRightHide, setRightHide] = useState(true);

  const changeRightNav = () => {
    setRightHide(!isRightHide);
  }

  const rightContainer = classnames({
    [styles.rightContainer]: true,
    [styles.ZeroWidth]: isRightHide,
  });
  

  useEffect(() => {
    // 改变标题
    dispatch(pageTitleChange(`笔记/文档`));

    // 代码高亮

    document.querySelectorAll("pre code").forEach((block) => {
      try {
        hljs.highlightElement(block);
        hljs.configure({ ignoreUnescapedHTML: true });
      } catch (error) {
        console.log("NavPage 有错误", error);
      }
    });
  });

  return (
    <>
      <Head>
        {/* <!-- sns 社交标签 begin --> */}
        {/* <!-- 参考微博API --> */}
        <title>笔记|文档</title>
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://doc.icenew.top" />
        <meta property="og:title" content={`七秒鱼|文档笔记`} />
        <meta
          property="og:description"
          content="学习笔记记载的页面"
        />
        {/* <!-- sns 社交标签 end --> */}
      </Head>
      {/* navtop 导航栏 */}
      <Navigationtop></Navigationtop>

      {/* 左边文章导航 */}
      <main className={styles.docContainer}>
        <aside className={leftNav}>
          <nav className={styles.menu}>
            {floderList.map((item, preIndex) => {
              return (
                <Collapse
                  defaultActiveKey={["0"]}
                  key={item.name + "left"}
                  expandIconPosition="right"
                  ghost="true"
                >
                  <Panel header={item.name} key={preIndex}>
                    {item.child instanceof Object
                      ? item.child.slugs.map((item2, index) => {
                          return (
                            <Button
                              block
                              type="link"
                              key={item2 + "link"}
                              onClick={() => changeIndex(preIndex, index)}
                            >
                              {item.child.frontmatter[index].title ?? item2}
                            </Button>
                          );
                        })
                      : ""}
                  </Panel>
                </Collapse>
              );
            })}
          </nav>
        </aside>

        {/* 文章主体部分 */}
        <article className={styles.articleContent}>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(
                floderList[docIndex[0]].child.content[docIndex[1]]
              ),
            }}
          ></div>
        </article>

        {/* 右边目录 */}
        <div className={rightContainer}>
          <div className={styles.catalogLinks}>
            {catatlogList.map((item) => {
              return (
                <span
                  className={styles.catalogLink}
                  key={item.link + item.type}
                  onClick={() => scrollToAnchor(item.link)}
                  data-type={item.type}
                >
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>
      </main>

      {/* 返回顶部 */}
      <BackTop />
      <MultiFunctionalMenu
        click={[changeLeftNav, changeRightNav]}
        title={["导航", "目录"]}
        barState={[isLeftHide, isRightHide]}
      />
      {/* 底部 */}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // 文档/笔记的根目录
  const docFloder = `documents`;
  // 获取文件
  const floders = fs.readdirSync(path.join(`${docFloder}`));
  const floderList = [];

  floders.map((item, index) => {
    let files = fs.readdirSync(path.join(`${docFloder}/${item}`));
    const frontmatters = [];
    const slugs = [];
    const contents = [];
    for (const x of files) {
      let slug = x.replace(`.md`, "");
      slugs.push(slug);
      const markdownWithMeta = fs.readFileSync(
        path.join(docFloder, `${floders[index]}/${x}`),
        "utf-8"
      );

      const { data: frontmatter, content } = matter(markdownWithMeta);
      frontmatters.push(frontmatter);
      contents.push(content);
    }
    floderList.push({
      name: floders[index],
      child: { frontmatter: frontmatters, slugs: slugs, content: contents },
    });
  });

  return {
    props: { floderList },
  };
}
