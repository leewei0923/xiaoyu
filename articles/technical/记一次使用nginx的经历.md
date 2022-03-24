---
title: nginx
tags: [nginx, 服务器]
authors: leewei
date: 2022.03.24
description: 记一次使用nginx的经历
---

# nginx 反向代理配置

```
server {
        listen       80;                   #监听的端口
        server_name  demo.example.com;     #来访的域名

        #修改反向代理地址
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host  $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_set_header Connection "";
            
            proxy_pass http://127.0.0.1:3000; #实际提供http内容服务的地址   
            proxy_redirect default;
            # root   html;                  # 默认的根目录
            #index  index.html index.htm;   # 默认的首页页面
        }
     } 
复制代码
```

# 注意事项

## location 中 proxy_pass 结尾带/接不带的区别

1. 在 nginx 中配置 proxy_pass 时，当在后面的url加上了/，相当于是绝对根路径，则nginx不会把location中匹配的路径部分代理走
2. 如果没有/，则会把匹配的路径部分也给代理走

举个例子：

```
 location  /proxy/ {

  proxy_pass http://127.0.0.1:3000/; # 这里有 / 

  }
复制代码
```

域名访问： `http://127.0.0.1:3000/proxy/test.html`

结论：会被代理到 `http://127.0.0.1:3000/test.html` 这个url

------

```
location  /proxy/ {
    proxy_pass http://127.0.0.1:81; # 这里没有 /

}

复制代码
```

域名访问： `http://127.0.0.1:3000/proxy/test.html`

结论：会被代理到 `http://127.0.0.1:81/proxy/test.html` 这个url
