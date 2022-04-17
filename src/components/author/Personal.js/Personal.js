import React from "react";
import styles from "./personal.module.scss";
import Image from "next/image";
import mine from "~/public/images/mine.jpg";
import XIcon from "../../XIcon/XIcon";
import { useRouter } from "next/router";

// 全局数据
const leftOptions = [
  {
    id: "1",
    name: "代码库",
    link: "/xiaoyu/code",
  },
  {
    id: "2",
    name: "作品集",
    link: "/works",
  },
  {
    id: "3",
    name: "小鱼说",
    link: "/xiaoyu/talks",
  },
];

const rightSocialS = [
  {
    id: "1",
    name: "github",
    link: "https://github.com/leewei0923",
    icon: "icon-github-fill",
  },
  {
    id: "2",
    name: "gitee",
    link: "",
    icon: "icon-gitee2",
  },
  {
    id: "3",
    name: "twitter",
    link: "https://twitter.com/Leewei60269181",
    icon: "icon-tuitetwitter43",
  },
  {
    id: "4",
    name: "stackovflow",
    link: "https://stackoverflow.com/users/17714128/weiwei",
    icon: "icon-stackoverflow-fill",
  },
];

const projections = [
  {
    id: "1",
    name: "weiweiBlog",
    link: "https://github.com/leewei0923/weiweiBlog.git",
    icon: "icon-blogger",
    desc: "gatsby + react 静态博客",
  },
  {
    id: "2",
    name: "dotCraft",
    link: "https://github.com/leewei0923/dotCraft.git",
    icon: "icon-anzhuo",
    desc: "简单的安卓小游戏",
  },
  {
    id: "3",
    name: "i-jiaran",
    link: "https://github.com/leewei0923/i-jiaran.git",
    icon: "icon-GooglePlugin",
    desc: "个人的谷歌插件",
  },
];

const language = [
  {
    id: "1",
    name: "JavaScript",
    progress: "80%",
    color: "#D9009D",
  },
  {
    id: "2",
    name: "React",
    progress: "80%",
    color: "#9628D9",
  },
  {
    id: "3",
    name: "Java",
    progress: "30%",
    color: "#2D87D0",
  },
  {
    id: "4",
    name: "Cangjie",
    progress: "10%",
    color: "#30ADBD",
  },
];

export default function Personal() {
  const router = useRouter();

  const Navigator = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className={styles.container}>
      <section className={styles.topContent}>
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
        <div className={styles.leftOptions}>
          {leftOptions.map((item) => (
            <span
              className={styles.optionName}
              key={item.name + item.id}
              onClick={(e) => Navigator(e, item.link)}
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className={styles.rightSocial}>
          {rightSocialS.map((item) => (
            <span
              className={styles.icon}
              key={item.name + item.id}
              onClick={(e) => Navigator(e, item.link)}
            >
              <XIcon type={item.icon} className={styles.smallIcon} />
            </span>
          ))}
        </div>
      </section>

      <section className={styles.introduction}>
        <p className={styles.name}>李伟 | leewei</p>
        <XIcon
          type="icon-xuexiao"
          styles={{
            fontSize: "25px",
            lineHeight: "30px",
            textAlign: "center",
            margin: "0 5px",
          }}
        />
        <span className={styles.desc}>青岛城市学院(青岛理工大学琴岛学院)</span>
        <p className={styles.motto}>
          梦想人人都可以去追寻，但是需要克服追梦途中的艰难困苦，也会放弃很多。
        </p>
      </section>

      <section className={styles.project}>
        <h2 className={styles.projTitle}>
          <XIcon type="icon-Gift" styles={{ margin: "0 10px" }} />
          <span>我的项目</span>
        </h2>

        <div className={styles.projectBox}>
          {projections.map((item) => (
            <div
              className={styles.projection}
              key={item.name + item.id}
              onClick={(e) => Navigator(e, item.link)}
            >
              <div className={styles.iconBg}>
                <XIcon type={item.icon} />
              </div>

              <p className={styles.name}>{item.name}</p>
              <p className={styles.simDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mySkills}>
        <h2>
          <XIcon type="icon-jineng" styles={{ margin: "0 10px" }} />
          <span>我的技能</span>
        </h2>

        <div className={styles.skills}>
          {language.map((item) => (
          <div className={styles.skill} key={item.name + item.id}>
            <div className={styles.progressBar} style={{background: item.color, width: item.progress}}></div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.progress}>{item.progress}</p>
          </div>
        ))}
        </div>
        
      </section>
    </div>
  );
}
