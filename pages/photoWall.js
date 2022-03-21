import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { pageTitleChange } from "~/src/store/action";
import styles from "~/styles/photoWall.module.scss";
import imgLinks from "~/src/utils/imgUrl";
import { Image } from "antd";
import BackTop from "~/src/components/BackTop/BackTop";
import { apiLoadPhoto } from "~/src/request/api";

export default function Photowall() {
  const dispatch = useDispatch();
  const [photoList, setPhotoList] = useState([]);

  const fetchData = async () => {
    const photoInfo = await apiLoadPhoto();
    if (photoInfo.data.status == "ok") {
      setPhotoList(photoInfo.data.info);
    }
    console.log(photoInfo)
  };


  useEffect(() => {
    let isMouted = false;

    if (!isMouted) {
      fetchData();
    }
    dispatch(pageTitleChange("照片墙"));
    () => {
      isMouted = true;
    };
  },[]);

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
          {photoList.map((item) => {
            return (
              <Image
                key={item._id}
                width={250}
                src={item.photoUrl}
                alt={item.photoDescrption}
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
