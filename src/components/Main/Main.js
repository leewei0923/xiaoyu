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


  // 首页文章模式模式
  const indexPageMode = useSelector((state) => {
    return state.changePageState.modeState;
  });

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
            {item.type === "life" && !indexPageMode ? (
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
                desc={desc}
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
