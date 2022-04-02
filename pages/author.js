import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/author.module.scss";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Chrono } from "react-chrono";
import { useDispatch } from "react-redux";
import { pageTitleChange } from "~/src/store/action";
import { Divider } from "antd";
import Introduction from "~/src/components/Introduction"
import { memorables } from "~/src/utils/history";

export default function Author() {
const dispatch = useDispatch(); 

const timelineBox = useRef(null);


  const items = [
    {
      title: "二月",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "一日",
      cardTitle: "主页",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "二日",
      cardTitle: "笔记",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "三日",
      cardTitle: "主页",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "四日",
      cardTitle: "笔记",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  ];

  useEffect(() => {
    // redux

    dispatch(pageTitleChange(`作者介绍页`));
    timelineBox.current.onmousewheel = (e) => {};
  }, [dispatch]);

  return (
    <>
      <Headers></Headers>
      {/* {console.log(bytephotoOffsetX)} */}
      <Navigationtop></Navigationtop>
      <main className={styles.container}>
        <div className={styles.authorIntroduction}>
          <div className={styles.title}>作者介绍</div>
          <div className={styles.introduction}>
            <Introduction />
          </div>
        </div>

        <Divider />
        <div className={styles.memorabilia}>
          <div className={styles.title}>历史记录</div>
          <div className={styles.timelineBox} ref={timelineBox}>
            <Chrono
              items={memorables}
              hideControls
              scrollable="false"
              mode="VERTICAL_ALTERNATING"
            />
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
