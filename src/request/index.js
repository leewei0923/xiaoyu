import axios from "axios";
import QS from 'qs';
import { message } from "antd";

const isProduction = process.env.NODE_ENV == 'production';

const basicUrl = isProduction ? 'localhost' : 'localhost';


// 设置axios基础路径

const service = axios.create({
  baseURL: basicUrl
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 每次发送请求之前检查本地存储中是否存在token
  // 如果存在, 则统一在http 请求的 header 都加上token, 由后台判断登录的情况
  // 存在本地的token 响应器对放回状态进行判断

  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("userToken");

  config.headers = {
    'authorization': "Bearer " + token,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }

  config.data = QS.stringify(config.data);
  return config;
}, err => err)

service.interceptors.response.use(res => {
  // 根据返回不同的状态码做出不同的事情
  // 

  if(res.code) {
    switch(res.code) {
      case 200: 
        return res.data;
      case 401:
        // 未登录处理方法
        
        break;
      case 403:
        // token 过期处理方法
        break;
      default: 
        message.error(res.data.msg);
    }

  } else {
    return res;
  }
})

export default service;

// admin管理接口