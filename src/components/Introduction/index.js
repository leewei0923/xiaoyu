import React from "react";
import styles from "./introduction.module.scss";
import {
  AntDesignOutlined,
  UserOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  Html5Outlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

export default function Index() {
  const skillStack = [
    {
      laug: "h5/css/JS",
      percent: "70",
      proficiency: "熟悉",
    },
    {
      laug: "React",
      percent: "60",
      proficiency: "熟悉",
    },
    {
      laug: "Node.js",
      percent: "60",
      proficiency: "熟悉",
    },
    {
      laug: "Java",
      percent: "30",
      proficiency: "了解",
    },
    {
      laug: "Flutter",
      percent: "30",
      proficiency: "了解",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.peronInfo}>
        <div className={styles.avatar}>
          <Avatar
            size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 120, xxl: 150 }}
            icon={<AntDesignOutlined />}
            className={styles.avatorIcon}
          />
        </div>
        <div className={styles.personInfoBox1}>
          <div className={styles.icon}>
            <UserOutlined />
            <span>江湖名称: 大伟</span>
          </div>
          <div className={styles.icon}>
            <HeartOutlined />
            <span>破壳日: 2000</span>
          </div>
        </div>
        <div className={styles.personInfoBox2}>
          <div className={styles.icon}>
            <EnvironmentOutlined />
            <span>常驻之地: China | 山东 | 青岛</span>
          </div>
          <div className={styles.icon}>
            <Html5Outlined />
            <span>目标语言: javaScript | Java | Python</span>
          </div>
        </div>
      </div>

      {/* 技能 */}
      <div className={styles.peronDetailBox}>
        <div className={styles.skillBox}>
          <div className={styles.subTitle}>技能 | Skill</div>
          <div className={styles.skill}>
            {skillStack.map((item) => {
              return (
                <div className={styles.skillDetail} key={item.laug}>
                  <div className={styles.laug}>{item.laug}</div>
                  <div
                    className={styles.proficiency}
                    data-pro={item.proficiency}
                    style={{ width: `${item.percent *2}px`, height:'18px' }}
                  >
                    {item.percent}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.introduction}>
          <div className={styles.subTitle}>简介 | Introduction</div>
          <ul className={styles.content}>
            <li className={styles.contentText}>学历：本科</li>
            <li className={styles.contentText}>目标：前端工程师or全栈工程师</li>
            <li className={styles.contentText}>博客：技术积累，共享知识</li>
            <li className={styles.contentText}>兴趣：骑车，运动</li>
            <li className={styles.contentText}>其他：一只小菜鸟，一直努力飞</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
