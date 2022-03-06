import fs from "fs";
import path from "path";
import mysql from "mysql"

var pool = mysql.createPool({
    host:"localhost",
    user:"leewei",
    password:"123456",
    database:"qdc"
})//数据库连接配置

pool.getConnection(function (err, connection) {
  // 使用连接池
  if (err) {
    console.log("与MySQL数据库建立连接失败！");
    console.log("错误信息为：" + err);
  } else {
    console.log("与MsSQL数据库建立连接成功！");
  }
});

export default function handler(req, res) {

  const files = [];
  const types = [];
  const names = [];
  fs.readdirSync(path.join("articles")).map((dir) => {
    return fs.readdirSync(path.join(`articles/${dir}`)).map((file) => {

      files.push(`${dir}/${file}`);
      types.push(dir);
      names.push(file.replace('.md',''))
    });
  });

  res.status(200).json({ slugs: files , types: types, names: names});
}


