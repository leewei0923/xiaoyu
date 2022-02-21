import styles from "./navigationTop.module.scss";
import { useEffect, useState } from "react";
import Navpage from "../NavigationPage/NavPage";
import classnames from "classnames";
import { Debounce, Throttle } from "../../utils/utils";
import { useSelector } from "react-redux";

export default function Navigationtop() {
  const [isNavTopHide, setIsNavTopHide] = useState(true);
  const [isNavPageHide, setIsNavPage] = useState(true);

  // 接收 从[slug].js(page)页获取标题
  const pageTitle = useSelector((state) => {
    return state.pageTitleChange.navTopTitle;
  });

  useEffect(() => {
    // 用于控制 navTop 
    let isMounted = false;
    let navTopToggle = async () => {
      window.addEventListener("scroll", () => {
        // ToDO 节流
        let offsetY = window.pageYOffset;
        let clientY = document.body.clientHeight;
        if (offsetY / clientY >= 0.15) {
          if (!isMounted) setIsNavTopHide(false);
        } else {
          if (!isMounted) setIsNavTopHide(true);
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

  // 用于

  let navContainer = classnames({
    [styles.navContainerHide]: isNavTopHide,
    [styles.navTopContainer]: !isNavTopHide,
  });

  return (
    <div>
      <div className={navContainer}>
        {/* progress bar | 进度条 */}
        <div className={styles.progressBar}></div>

        {/* 百分比 | 目录 | 标题 | 按钮 */}
        <div className={styles.features}>
          <div className={styles.percent}>
            <span>70%</span>
          </div>
          <div className={styles.catalogSwitch}>
            <span className={styles.catalogBtn}>目录</span>
          </div>

          <p className={styles.articleTitle}> {pageTitle ? `『${pageTitle}』` : `『 主页 』`} </p>

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
    </div>
  );
}
