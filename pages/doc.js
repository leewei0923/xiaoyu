import fs from 'fs';
import path from 'path';

import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pageTitleChange } from "~/src/store/action";

export default function Doc() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 改变标题
    dispatch(pageTitleChange(`笔记/文档`));
  });
  return (
    <>
      <Navigationtop></Navigationtop>
      <div>doc</div>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps(){
  // 文档/笔记的根目录
  const docFloder = `documents`;
  // 获取文件
  const floders = fs.readdirSync(path.join(`${docFloder}`));
  const res = [];

  floders.map((item) => {
    let files = fs.readdirSync(path.join(`${docFloder}/${item}`));

    res.push(files);
  })

  console.log(res);

  return {
    props: {
      "name": "小米"
    }
  }
}