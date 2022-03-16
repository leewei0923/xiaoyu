import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/author.module.scss";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";

export default function Author() {
  // byteCard
  const byteCard = useRef(null);
  const [bytephotoOffsetX, setOffsetX] = useState(0);


  /**
   * 
   * @param {*} target 
   * @param {*} callback 
   * desc: 拖动滑块
   */
  const startDrag = function dragPhotoCard(target, callback) {
    let left = 0;
    let currentX = 0;
    let flag;
    // 0 left 当前的left值, 1 currentX, 2 flag
    // 按下事件
    target.onmousedown = (e) => {
      flag = true;
      // 取消默认事件
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.preventDefault = false;
      }
      console.log("按下", flag);
      currentX = e.screenX;
    };

    // 鼠标移动

    target.onmousemove = (e) => {
      e = e || window.event;

      if (flag) {
        let nowX = e.screenX;
        let disX = nowX - currentX;

        setOffsetX(disX);
        console.log("移动了", disX);
      }
    };

    // 鼠标松开

    target.onmouseup = (e) => {
      const disX = e.screenX - currentX;
      currentX = 0;
      if (disX <= 200 && disX >= -200) {
        setOffsetX(0);
      } else {
        setOffsetX(disX);
      }
      console.log("放开");
      flag = false;
    };
  };

  // --------

  const byteIcon = classnames({
    [styles.byteIcon]: true,
    [styles.centerIcon]: true,
    [styles.commonIcon]: false,
  });

  useEffect(() => {
    startDrag(byteCard.current);
  }, []);

  return (
    <>
      <Headers></Headers>
      {/* {console.log(bytephotoOffsetX)} */}
      <Navigationtop></Navigationtop>
      <div className={styles.conatiner}>
        <div className={styles.Memorabilia}>
          <p className={styles.title}>大事记</p>

          {/* 展示内容 */}
          <div className={styles.byteCard} ref={byteCard}>
            <div
              className={styles.bytePhoto}
              style={{
                left: `${bytephotoOffsetX}px`,
                transition: `all 0s linear`,
              }}
            ></div>
          </div>

          {/* 小图标 */}

          <div className={styles.smallIcon} ref={byteCard}>
            <div className={styles.itemBox}>
              <div className={styles.beforeLine}></div>
              <div className={byteIcon}>03.12</div>
              <div className={styles.afterLine}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
