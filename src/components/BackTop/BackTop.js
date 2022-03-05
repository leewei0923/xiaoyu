import styles from "./backTop.module.scss";
import { useEffect, useState } from "react";
import classnames from "classnames";

export default function BackTop(props) {
  const { duration, visibilityHeight, onClick, Icon } = props;
  /**
   * duration 回到顶部时间 默认 450
   * target 设置需要监听元素滚动事件的元素，值为一个返回对应DOM元素的函数
   * visibilityHeight 滚动高度达到多少才出现BackTop 默认400
   */
  // 用于控制backtop 显示和隐藏
  const [isVisible, setIsVisible] = useState(false);

  // 控制 backTop显示和隐藏
  const backTopShow = () => {
    let backTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (backTop > (visibilityHeight ?? 450) && !isVisible) {
      setIsVisible(true);
    } else if (backTop <= (visibilityHeight ?? 450) && isVisible) {
      setIsVisible(false);
    }
  };

  // 返回顶部
  const backTopClick = (callback) => {
    const scrollSmoothTo = function (position) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
          return setTimeout(callback, duration ?? 450);
        };
      }

      // 当前滚动高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 滚动step方法
      const step = function () {
        // 距离目标滚动距离
        const distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
          window.scrollTo(0, position);
        } else {
          window.scrollTo(0, scrollTop);
          requestAnimationFrame(step);
        }
      };
      step();
    };

    scrollSmoothTo(0);

    return callback;
  };

  const backTopContainer = classnames({
    [styles.backTopContainer]: true,
    [styles.inVisible]: !isVisible,
  });

  useEffect(() => {
    let isMounted = false;

    window.addEventListener("scroll", () => {
      if (!isMounted) backTopShow();
    });

    return () => {
      isMounted = true;
      window.removeEventListener("scroll", () => {});
    };
  });

  return (
    <div className={backTopContainer} onClick={() => backTopClick(onClick)}>
      {Icon ? (
        <div className={styles.propsIcon}>{Icon}</div>
      ) : (
        <span className={styles.icon}></span>
      )}
    </div>
  );
}
