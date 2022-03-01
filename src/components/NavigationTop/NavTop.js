import styles from "./navigationTop.module.scss";
import { useEffect, useState } from "react";
import Navpage from "../NavigationPage/NavPage";
import { useSelector } from "react-redux";

export default function Navigationtop() {
  const [isNavPageHide, setIsNavPage] = useState(true);
  // navtopBar 进度条长度
  const [topBarLen, setTopBarLen] = useState(0);

  // 接收 从[slug].js(page)页获取标题
  const pageTitle = useSelector((state) => {
    return state.pageTitleChange.navTopTitle;
  });

  useEffect(() => {
    // 用于控制 navTop 
    let isMounted = false;
    let navTopToggle = async () => {
      window.addEventListener("scroll", () => {
        // 用来计算进度条百分比
        let offsetY = window.pageYOffset;
        let clientY = document.body.clientHeight;
        let barLen = ((offsetY / clientY)*100).toFixed(0);
        if (offsetY / clientY >= 0.15) {
          if (!isMounted){
            setTopBarLen(barLen);
          } 
        } else {
          if (!isMounted){
            setTopBarLen(barLen);
          } 
        }
        // console.log("移动", window.pageYOffset, "页面高度", document.body.clientHeight)
      });
    };
    navTopToggle();

    return () => {
      isMounted = true;
    };
  }, []);

  // 导航的开关
  const navPageToggle = function () {
    setIsNavPage(!isNavPageHide);
  };


 

  return (
    <>
      <div className={styles.navTopContainer}>
        {/* progress bar | 进度条 */}
        <div
          className={styles.progressBar}
          style={{ width: `${topBarLen}%` }}
        ></div>

        {/* 百分比 | 目录 | 标题 | 按钮 */}
        <div className={styles.features}>
          <div className={styles.percent}>
            <span>{topBarLen}%</span>
          </div>

          <p className={styles.articleTitle}>
            {" "}
            {pageTitle ? `『${pageTitle}』` : `『 主页 』`}{" "}
          </p>

          <div className={styles.menuBtn} onClick={navPageToggle}>
            <svg
              t="1644824065690"
              className={styles.menuIcon}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2284"
              width="100"
              height="100"
            >
              <path
                d="M44.4 245.9h935.2c24.4 0 44.4-20 44.4-44.4s-19.8-44.4-44.4-44.4H44.4C20 157.1 0 177.1 0 201.5s20 44.4 44.4 44.4z m935.2 221.8H44.4C20 467.7 0 487.7 0 512.1s20 44.4 44.4 44.4h935.2c24.4 0 44.4-20 44.4-44.4s-20-44.4-44.4-44.4z m0 310.4H44.4C20 778.1 0 797.8 0 822.5s20 44.4 44.4 44.4h935.2c24.4 0 44.4-19.8 44.4-44.4s-20-44.4-44.4-44.4z"
                p-id="2285"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <Navpage isNavPageHide={isNavPageHide} navPageToggle={navPageToggle} />
    </>
  );
}
