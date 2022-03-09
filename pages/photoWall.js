import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { pageTitleChange } from "~/src/store/action";
import styles from "~/styles/photoWall.module.scss";
import imgLinks from "~/src/utils/imgUrl";
import { Image } from "antd";
import BackTop from "~/src/components/BackTop/BackTop";

export default function Photowall() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageTitleChange("照片墙"));
  });

  return (
    <>
      <Headers></Headers>
      <Navigationtop></Navigationtop>
      <main className={styles.container}>
        <section className={styles.desc}>
          <p>文字记载动态的图景,相片承载记忆的瞬间</p>
          <p>文字与相片溶在我们的心里</p>
          <p>照片中的故事</p>
        </section>

        {/* 照片 */}
        <div className={styles.photoContainer}>
          {imgLinks.map((item) => {
            return (
              <Image
                key={item.url}
                width={250}
                src={item.url}
                alt={item.desc}
                className={styles.img}
              />
            );
          })}
        </div>
      </main>
      <BackTop />
      <Footer></Footer>
    </>
  );
}
