import React from "react";
import styles from "./personal.module.scss";
import Image from "next/image";
import mine from "~/public/images/mine.jpg";

// 全局数据
const leftOptions = [
  {
    id: "1",
    name: "代码库",
    link: "/mine/code",
  },
  {
    id: "2",
    name: "作品集",
    link: "/works",
  },
  {
    id: "3",
    name: "小鱼说",
    link: "/mine/talks",
  },
];

const rightSocialS = [
  {
    id: "1",
    name: "github",
    link: "",
    icon: "",
  },
  {
    id: "2",
    name: "gitee",
    link: "",
    icon: "",
  },
  {
    id: "3",
    name: "twitter",
    link: "",
    icon: "",
  },
  {
    id: "4",
    name: "stackovflow",
    link: "",
    icon: "",
  },
];

export default function Personal() {
  return (
    <div className={styles.container}>
      <section className={styles.topContent}>
        <div className={styles.leftOptions}>
          {leftOptions.map((item) => (
            <span className={styles.optionName} key={item.name + item.id}>
              {item.name}
            </span>
          ))}
        </div>

        <div className={styles.avator}>
          <div>
            <Image
              src={mine}
              alt="个性头像"
              width={150}
              height={150}
              className={styles.mineImg}
            />
          </div>
        </div>

        <div className={styles.rightSocial}></div>
      </section>
    </div>
  );
}
