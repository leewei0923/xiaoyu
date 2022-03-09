import fs from "fs";
import path from "path";
import { generateID } from "~/src/utils/utils";
import { timeFormatte } from "~/src/utils/timeFormatte";
import matter from "gray-matter";

export default function handler(req, res) {
  const { list } = req.query;

  const archivesMap = new Map();
  let articlesCount = 0; // 用于文章计数

  fs.readdirSync(path.join("articles")).map((dir) => {
    return fs.readdirSync(path.join(`articles/${dir}`)).map((file) => {
      // 获取文章创建的时时间

      const stats = fs.statSync(`articles/${dir}/${file}`);
      const markdownWithMeta = fs.readFileSync(`articles/${dir}/${file}`);
      const {
        data: { tags },
      } = matter(markdownWithMeta);
      const slug = `${dir}/${file}`.replace(".md", "");

      const [year, month, day] = timeFormatte(stats.ctime)[0].split("-");
      const date = `${month}-${day}`;

      if (archivesMap.has(year)) {
        const tem = archivesMap.get(year);
        tem.push({
          key: generateID(slug),
          name: file.replace(".md", ""),
          type: dir,
          slug,
          date,
          tags,
        });
        archivesMap.set(year, [...tem]);
      } else {
        archivesMap.set(year, [
          {
            key: generateID(slug),
            name: file.replace(".md", ""),
            type: dir,
            slug,
            date,
            tags,
          },
        ]);
      }

      articlesCount++;
    });
  });

  const info = [];

  for (const [k, v] of archivesMap) {
    info.push({ year: k, child: v });
  }
  res.status(200).json({
    version: "V1.0",
    status: "ok",
    articlesCount,
    info,
  });
}
