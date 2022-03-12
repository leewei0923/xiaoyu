import service from "./index";

const host3000 = "http://localhost:3000/";
const host3001 = "http://localhost:3001/";
// 请求本地文章接口

// pages\archive.js 用于文章归档 POST
export const apiArchiveInfo = (options) =>
  service.post(`${host3000}api/articles/getArchiveInfo`, options);



// 请求user 接口

// 用户管理接口
// pages\admin\account.js 用于获取用户列表 GET
export const apiAccountUser = (options) =>
  service.get(`${host3001}api/login/getUserInfo`, options);

// pages\admin\account.js  POST 用于添加用户资料
export const apiInsertUser = (options) =>
  service.post(`${host3001}api/login/insertUser`, options);

// pages\admin\account.js post 用于删除用户账号

export const apiOndelete = (options) =>
  service.post(`${host3001}api/login/deleleAccount`, options);

// pages\admin\login.js 用于登录

export const apiLoginIn = (options) =>
  service.post(`${host3001}api/login/loginIn`, options);
