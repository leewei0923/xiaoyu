/*
 * @Author: leewei
 * @Date: 2022-03-06 21:31:30
 * @LastEditors: leewei
 * @LastEditTime: 2022-04-09 22:07:51
 * @FilePath: \xiaoyu\pages\api\articles\[...list].js
 * @Description: 
 * 
 * Copyright (c) 2022 by leewei, All Rights Reserved. 
 */
import fs from "fs";
import path from "path";
import { generateID } from "~/src/utils/utils";
import { timeFormatte } from "~/src/utils/timeFormatte";
import matter from "gray-matter";

export default function handler(req, res) {
  const { list } = req.query;

  const articleInfoList = [];
  fs.readdirSync(path.join("articles")).map((dir) => {
    return fs.readdirSync(path.join(`articles/${dir}`)).map((file) => {
      // 获取文章创建的时时间

      const stats = fs.statSync(`articles/${dir}/${file}`);
      const markdownWithMeta = fs.readFileSync(`articles/${dir}/${file}`);
      const { data: frontmatter } = matter(markdownWithMeta);

      const date = timeFormatte(stats.ctime);
      
      const slug = `${dir}/${file}`.replace(".md", "");
      articleInfoList.push({
        key: generateID(slug),
        name: file.replace(".md", ""),
        type: dir,
        slug,
        dir,
        date,
        frontmatter,
      });
    });
  });

  // console.log(articleInfoList)
  // 分页设置，先放弃
  // const curIndex = list[1] ?? "1";
  // const len = articleInfoList.length;
  // const totalPages = Math.ceil(len / 10);
  // let shortList = [];
  // if (curIndex <= totalPages) {
  //   shortList = articleInfoList.slice([
  //     (curIndex - 1) * 10,
  //     (curIndex - 1) * 10 + 9,
  //   ]);
  // } else {
  //   res
  //     .status(400)
  //     .json({ status: "fail", message: "你请求的的页面数量大于最大长度" });
  // }

  // currentPage: curIndex,
  //   totalPages: totalPages,

  res.status(200).json({
    status: "ok",
    articlesInfoList: articleInfoList,
  });
}
