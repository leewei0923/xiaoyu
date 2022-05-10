import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/author.module.scss";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { pageTitleChange, changeBgImg } from "~/src/store/action";
import Personal from "~/src/components/author/Personal.js/Personal";

export default function Author() {
  const dispatch = useDispatch();

  const timelineBox = useRef(null);

  useEffect(() => {
    // redux

    dispatch(pageTitleChange(`作者介绍页`));
    dispatch(
      changeBgImg(
        "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538_1280.jpg"
      )
    );
  }, [dispatch]);

  return (
    <>
      <Headers></Headers>
      {/* {console.log(bytephotoOffsetX)} */}
      <Navigationtop />
      <main className={styles.container}>
        <Personal />
      </main>
      <Footer></Footer>
    </>
  );
}
