import axios from "axios";

// api 管理 
const hostname = localhost;
const portArticle = 3000;
const portInteract = 3001;

const isProduction = process.env.NODE_ENV == 'production';

const basicUrl = isProduction ? localhost : localhost;
// 文章接口


// 设置axios基础路径

const service = axios.create({
  baseURL: basicUrl
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 每次发送请求之前检查本地存储中是否存在token
  // 如果存在, 则统一在http 请求的 header 都加上token, 由后台判断登录的情况
  // 存在本地的token 响应器对放回状态进行判断

  const token = window.localStorage.getItem('token') || 
})

// admin管理接口