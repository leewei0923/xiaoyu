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
  const curIndex = list[1] ?? "1";
  const len = articleInfoList.length;
  const totalPages = Math.ceil(len / 10);
  let shortList = [];
  if (curIndex <= totalPages) {
    shortList = articleInfoList.slice([
      (curIndex - 1) * 10,
      (curIndex - 1) * 10 + 9,
    ]);
  } else {
    res
      .status(400)
      .json({ status: "fail", message: "你请求的的页面数量大于最大长度" });
  }

  res.status(200).json({
    status: "ok",
    currentPage: curIndex,
    totalPages: totalPages,
    articlesInfoList: shortList,
  });
}
