import styles from "./header.module.css";
import { useSelector } from "react-redux";
import bg from "~/public/images/header-bg.jpg";
import { useEffect, useState } from "react";
import { apiLoadMotto } from "~/src/request/api";

export default function Headers() {
  const [motto, setMotto] = useState();
  const imgUrl = useSelector((state) => {
    return state.changeBgImg.imgUrl;
  });
  const fetchData = async () => {
    const data = await apiLoadMotto();
    setMotto(data.data.motto);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <header
      className={styles.headerBg}
      style={{
        backgroundImage: `url(${imgUrl ? imgUrl : bg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: `cover`,
      }}
    >
      <div className={styles.mask}>
        {/* 名人名言  */}

        <div className={styles.mottoContainer}>
          <p className={styles.content}>{motto ? motto.content  :  ''}</p>

          <p className={styles.space}>-</p>
          <p className={styles.author}>{motto? motto.author : ''}</p>
        </div>

        {/*  */}
      </div>
    </header>
  );
}
