import fs from "fs";
import path from "path";
import { generateID } from "~/src/utils/utils";
import { timeFormatte } from "~/src/utils/timeFormatte";
import matter from "gray-matter";


// 用于传入slug 然后读取内容,用于更改

export default function handler(req, res) {
  const { slug } = req.body;

  const filePath = path.join(`articles/${slug}.md`);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
    const date = timeFormatte(stats.ctime)[0];
    const {
      data: { tags },
      content,
    } = matter(markdownWithMeta);
    const [type, name] = slug.split("/");
    const key = generateID(slug);

    res
      .status(200)
      .json({ status: "ok", key, slug, tags, content, date, type, name });
  } else {
    res
      .status(400)
      .json({ status: "fail", message: "请求的slug / 路径有问题请检查一下" });
  }
}
