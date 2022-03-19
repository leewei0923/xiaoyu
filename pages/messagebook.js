import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/messagebook.module.scss";
import { useDispatch } from "react-redux";
import { pageTitleChange } from "~/src/store/action";
import { useEffect, useState } from "react";
import BackTop from "~/src/components/BackTop/BackTop";

import Comment from "~/src/components/Comment";
import Editor from "~/src/components/Comment/Editor";
import { Divider, Pagination } from "antd";
import { apiGetCommentInfo } from "~/src/request/api";

export default function Messagebook({ children }) {
  const dispatch = useDispatch();
  const [messageInfo, setCommentInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 当前页面

  const fetchData = () => {
    apiGetCommentInfo().then((res) => {
      const { status, info } = res.data;
      if (status == "ok") {
        setCommentInfo(info);
      }
    });
  };

  const changePagation = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // 改变标题
    dispatch(pageTitleChange("留言录"));

    // 获取评论信息

    fetchData();

    return () => {};
  }, [dispatch]);

  return (
    <>
      <Headers></Headers>
      <Navigationtop></Navigationtop>

      <section className={styles.titleContent}>
        <h3>留言墙</h3>
        <p>有朋自远方来, 不亦说乎!</p>
        <p>欢迎畅所欲言,提出意见和建议!</p>
      </section>
      <Divider />
      {console.log(10 * (currentPage - 1), 10 * currentPage)}
      <div className={styles.chatBox}>
        {messageInfo
          .slice(10 * (currentPage - 1), 10 * currentPage)
          .map((item) => {
            return (
              <Comment key={item._id + item.date} messageInfo={item}></Comment>
            );
          })}
      </div>
      <Pagination
        current={currentPage}
        onChange={(p) => changePagation(p)}
        total={messageInfo.length}
        showLessItems="true"
        pageSize={10}
      />
      <Divider />

      <Editor fetchData={fetchData} />
      <BackTop />
      <Footer></Footer>
    </>
  );
}
