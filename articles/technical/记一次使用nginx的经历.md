---
title: nginx
tags: [nginx, 服务器]
authors: leewei
date: 2022.03.24
description: 记一次使用nginx的经历
---



## 基本命令

```
nginx -t             检查配置文件是否有语法错误
nginx -s reload       热加载，重新加载配置文件
nginx -s stop         快速关闭
nginx -s quit         等待工作进程处理完成后关闭

```

## nginx 配置

先来一个张图感受一下



![image-20220328134016550](https://qi.7miaoyu.com/typora/image-20220328134016550.png)

出现这个错误是我的设置有问题，这个好像是加载的一个iframe，引用源头出现问题。原网址是http://www.icenew.top 在其后面加上http://www.icenew.top/blog 就正常显示页面.所以配置应该没问题。

### 默认配置

我的nginx默认安装地址在`/etc/nginx/`

Nginx 安装目录下,先备份一下`nginx.conf`，备份为`nginx.conf.default`

```nginx
# 工作进程的数量
worker_processes  1;
events {
    worker_connections  1024; # 每个工作进程连接数
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    # 日志格式
    log_format  access  '$remote_addr - $remote_user [$time_local] $host "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for" "$clientip"';
    access_log  /srv/log/nginx/access.log  access; # 日志输出目录
    gzip  on;
    sendfile  on;

    # 链接超时时间，自动断开
    keepalive_timeout  60;

    # 配置
    server {
        listen       8080;
        server_name  localhost; # 浏览器访问域名

        charset utf-8;
        access_log  logs/localhost.access.log  access;

        # 路由
        location / {
            root   www; # 访问根目录
            index  index.html index.htm; # 入口文件
        }
    }

    # 引入其他的配置文件
    include servers/*;
}
```



### 搭建一个站点

```nginx
server {
    listen       8080; #端口 8080
    server_name  xx_domian; # 浏览器访问域名
	root         /home/doc; # 我的项目放置的文件夹
    charset utf-8; #编码
    
     # 开启gzip 压缩
    gzip on;
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain application/javascript text/css;

    # 路由
    location / {
        root   www; # 访问根目录
        index  index.html index.htm; # 入口文件
    }
}
```



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
