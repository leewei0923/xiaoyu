import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.scss";
import PostCard from "./PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { changePageMode } from "~/src/store/action";
import TechPostCard from "./TechPostCard/TechPostCard";
import React from "react";
import { marked } from "marked";
export default function Mains(props) {
  // const {frontmatter:{date, description, tags, title, img}, slug} = {frontmatter: {title: '使用 React 和 Next.js 构建博客', description: 'Next.js 是由 Vercel 创建和维护的基于 React 的应用程序框架。本教程将从零开始学习如何使用 Next.js 构建一个小型的博客网站。', date: '2022.01.22', tags: Array(3), img: 'https://cdn.pixabay.com/photo/2022/01/01/15/40/train-6907884_1280.jpg'},slug: "articles"};

  return (
    <div className={styles.mainContainer}>
      {/* {console.log(props)} */}
      {/* 内容主体部分 */}
      {props.posts.map((item, index) => {
        {
          /* const {frontmatter:{date, description, tags, title, img}, slug}  = item; */
        }
        const textpattren = /[\u4e00-\u9fa5 | \w | \, | \, |\. | \。]+/g;
        const desc = item.content.slice(0, 200).match(textpattren);
        
        return (
          <React.Fragment key={item.slug + "frag"}>
            {item.type === "life" ? (
              <PostCard
                post={item}
                index={index}
                key={item.slug + "life"}
                type={item.type}
              />
            ) : (
              ""
            )}

            {item.type === "technical" ? (
              <TechPostCard
                post={item}
                key={item.slug + "technical"}
                type={item.type}
                desc = {desc}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        );
      })}

      {/* 预留分页 */}

      <div className={styles.pagination}></div>
    </div>
  );
}
