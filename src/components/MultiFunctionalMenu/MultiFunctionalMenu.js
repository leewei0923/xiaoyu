import styles from "./multiFunctionalMenu.module.scss";
import classnames from "classnames";
import { useState } from "react";
export default function MultiFunctionalMenu(props) {
  // 菜单按钮
  const { click, title, barState } = props;

  const [isShow, setIsShow] = useState(false);

  const changeMenuBtnState = (e) => {
    setIsShow(!isShow);
  };
  const menu = classnames({
    [styles.menu]: true,
    [styles.show]: isShow,
  });

  const ulList = classnames({
    [styles.inVisible]: !isShow,
  });
  return (
    <div className={menu}>
      <div
        className={styles.menuToggle}
        onClick={() => changeMenuBtnState()}
      ></div>

      <ul className={ulList}>
        {title.map((item, index) => (
          <li
            className={styles.menuItem}
            onClick={() => click[index]()}
            key={item}
            style={barState[index] ? {} : { backgroundColor: "cornflowerblue" }}
          >
            <span
              style={barState[index] ? {} : { color: "#fff" }}
            >
              {title[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
