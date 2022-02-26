---
title: axios
tags: [前端, axios]
authors: leewei
---

## 提纲

```
1. HTTP相关
2. XHR的理解和使用
3. axios的理解和使用
4. axios源码分析
```

### MDN文档

https://developer.mozilla.org/zh-CN/docs/Web/HTTP



```
客户端  请求行/请求头请求体 --->
						<---  状态行/响应头/实体内容   服务器
```



1. 前后应用从浏览器端向服务器发送HTTP请求(请求报文)
2. 后台服务器接收到请求后，调度服务器应用处理请求，向浏览器端返回HTTP响应（响应报文）
3. 浏览器接收到响应，解析显示响应体



1. method url

   GET /poduct_detail

   POST

2. 多个请求头

   Host: www.qq.com

   Cookie: 

   Content-Type: application/x-www-form-urlencoded 或者 application/json

3. 请求体

   user='x'&pwd='1'

   {user:'x';pwd:'1'}



### HTTP响应报文

1. 响应状态行 status statusText

2. 多个响应头

   ```
   Content-Type: text/html;charset=utf-8
   Set-Cookie: BD_CK_SAM=1;path=
   ```

3. 响应体

   html等文件



### 常见的响应状态码

| 200  | ok                    | 请求成功,一般用于Get与Post连接       |
| ---- | --------------------- | ------------------------------------ |
| 201  | Created               | 已创建,成功请求并创建了新的资源      |
| 401  | Unauthorzied          | 未授权/请求要求用户的身份认证        |
| 404  | Not Found             | 服务器无法根据客户端的请企业找到资源 |
| 500  | Internal Server Error | 服务器内部错误,无法完成请求          |

### 不同类型的请求及其作用

| GET    | 从服务器端读取数据         |      |
| ------ | -------------------------- | ---- |
| POST   | 向服务器端添加新数据       |      |
| PUT    | 更新服务器端已经存在的数据 |      |
| DELETE | 删除服务器端数据           |      |

