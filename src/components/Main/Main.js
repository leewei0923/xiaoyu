import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.scss";
import PostCard from "./PostCard/PostCard";

export default function Mains(props) {

  // const {frontmatter:{date, description, tags, title, img}, slug} = {frontmatter: {title: '使用 React 和 Next.js 构建博客', description: 'Next.js 是由 Vercel 创建和维护的基于 React 的应用程序框架。本教程将从零开始学习如何使用 Next.js 构建一个小型的博客网站。', date: '2022.01.22', tags: Array(3), img: 'https://cdn.pixabay.com/photo/2022/01/01/15/40/train-6907884_1280.jpg'},slug: "articles"};

  return (
    <div className={styles.mainContainer}>
    {console.log(props.posts)}
      {/* 内容主体部分 */}

      {props.posts.map((item, index) => {
        {/* const {frontmatter:{date, description, tags, title, img}, slug}  = item; */}
        return (
          <PostCard post={item} index = {index} key={item.slug}/>
        );
      })}
      
      
      {/* 预留分页 */}

      <div className={styles.pagination}></div>
    </div>
  );
}
