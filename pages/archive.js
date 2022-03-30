import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import styles from "~/styles/archive.module.scss";
import { useDispatch } from "react-redux";
import { changeBgImg, pageTitleChange } from "../src/store/action";
import { useEffect, useState } from "react";
import ArchiveItem from "~/src/components/ArchiveItem/ArchiveItem";
import BackTop from "~/src/components/BackTop/BackTop";
import { apiArchiveInfo } from "~/src/request/api";
import { Pagination } from "antd";

export default function Archive() {
  const dispatch = useDispatch();
  const [artcileData, setArticleData] = useState([]); // 文章信息
  const [ArticleCount, setArticleCount] = useState("0"); // 文章数量
  const [currentPage, setCurrentPage] = useState(1); // 当前页面

  const onChangePage = (p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    const fetchData = function () {
      dispatch(pageTitleChange(`归档`));
      // 集成化 api 管理
      apiArchiveInfo().then((res) => {
        const { articlesCount, info } = res.data;
        setArticleData(info || []);
        setArticleCount(articlesCount || "");
      });
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <Headers></Headers>
      <Navigationtop></Navigationtop>
      <div className={styles.container}>
        <p className={styles.articleCount}>
          一共有<span>{ArticleCount ?? 0}</span>篇文章
        </p>
        {artcileData
          .map((item) => {
            return (
              <ArchiveItem
                info={item}
                key={item.year}
                currentPage={currentPage}
              />
            );
          })}

        <div className={styles.pagination}>
          <Pagination
            current={currentPage}
            pageSize={7}
            onChange={(p) => onChangePage(p)}
            total={ArticleCount}
          />
        </div>
      </div>

      <BackTop />
      <Footer />
    </>
  );
}
