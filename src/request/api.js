import service from "./index";

const host3001 =
  process.env.NODE_ENV == "production"
    ? "https://doc.icenew.top/"
    : "http://127.0.0.1:3001/";

const host3000 =
  process.env.NODE_ENV == "production"
    ? "https://doc.icenew.top/"
    : "http://127.0.0.1:3000/";



// 请求本地文章接口

// pages\archive.js 用于文章归档 POST
export const apiArchiveInfo = (options) =>
  service.post(`${host3000}api/articles/getArchiveInfo`, options);

// 首页 加载文章 摘要

export const apiArticleList = (options) =>
  service.post(`${host3001}blogApi/article/list`,options);

// 同步文章

export const apiSyncArticle = (options) => service.get(`${host3001}blogApi/syncArticle`, options);
// 后台加载数据
export const apiArticleBackList = (options) =>
  service.post(`${host3001}blogApi/article/backList`, options);

export const apiUpdateState = (options) =>
  service.post(`${host3001}blogApi/article/updateArticleState`, options);
  

// 请求user 接口

// 用户管理接口
// pages\admin\account.js 用于获取用户列表 GET
export const apiAccountUser = (options) =>
  service.get(`${host3001}blogApi/login/getUserInfo`, options);

// pages\admin\account.js  POST 用于添加用户资料
export const apiInsertUser = (options) =>
  service.post(`${host3001}blogApi/login/insertUser`, options);

// pages\admin\account.js post 用于删除用户账号

export const apiOndelete = (options) =>
  service.post(`${host3001}blogApi/login/deleleAccount`, options);

// pages\admin\login.js 用于登录

export const apiLoginIn = (options) =>
  service.post(`${host3001}blogApi/login/loginIn`, options);

// pages\admin\mine.js 用户个性信息获取
export const apiPersonalInfo = (options) =>
  service.post(`${host3001}blogApi/login/getPersonInfo`, options);

// pages\admin\mine.js 用户个性信息插入
export const apiInsertPersonalInfo = (options) =>
  service.post(`${host3001}blogApi/login/insertPersonalInfo`, options);

/**
 * 留言录
 */

// 添加信息

export const apiInsertComment = (options) =>
  service.post(`${host3001}blogApi/message/insertComment`, options);

// 获取信息

export const apiGetCommentInfo = (options) =>
  service.post(`${host3001}blogApi/message/getCommentInfo`, options);

// 后台获取详细信息

export const apiGetCommentDetaill = (options) =>
  service.post(`${host3001}blogApi/message/getCommentDeatilInfo`, options);

// 后台回复信息

export const apiReplayComment = (options) =>
  service.post(`${host3001}blogApi/message/replayComment`, options);

// 前台删除信息

export const apiDelFrontComment = (options) =>
  service.post(`${host3001}blogApi/message/delFrontComment`, options);

// 后台删除信息

export const apiDelBackComment = (options) =>
  service.post(`${host3001}blogApi/message/delBackComment`, options);

/**
 * 图库
 */

// 添加图片

export const apiAddPhoto = (options) =>
  service.post(`${host3001}blogApi/gallery/insertGallery`, options);

// 删除图片

export const apiDelPhoto = (options) =>
  service.post(`${host3001}blogApi/gallery/delGallery`, options);

// 加载图片

export const apiLoadPhoto = (options) =>
  service.post(`${host3001}blogApi/gallery/loadPhoto`, options);

/**
 * 代码日记
 */

// 添加

export const apiInsertCode = (options) =>
  service.post(`${host3001}blogApi/code/insertCode`, options);

// 后台查询

export const apiLoadBackCode = (options) =>
  service.post(`${host3001}blogApi/code/loadBackCode`, options);

// 更新信息

export const apiUpdateInfoCode = (options) =>
  service.post(`${host3001}blogApi/code/updateInfo`, options);
// 删除内容

export const apiDeleteCode = (options) =>
  service.post(`${host3001}blogApi/code/deleteCode`, options);

// 加载提交的数量

export const apiLoadCommitCount = (options) =>
  service.get(`${host3001}blogApi/code/loadCommitCount`, options);

/**
 * draft 处的api
 * 
 */

// 更新信息

export const apiLoadCodeDrafts = (options) =>
  service.post(`${host3001}blogApi/code/loadCodeDrafts`, options);

export const apiLoadMotto = (options) =>
  service.get(`${host3001}blogApi/motto`, options);

