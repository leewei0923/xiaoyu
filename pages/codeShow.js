import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/codeShow.module.scss";
import { useDispatch } from "react-redux";
import { pageTitleChange } from "~/src/store/action";
import { useEffect } from "react";

apiLoadMotto;

export default function CodeShow() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageTitleChange("算法角"));
  }, [dispatch]);

  return (
    <>
      <Headers />
      <Navigationtop />
      <div className={styles.container}>代码展示</div>

      <Footer />
    </>
  );
}
