---
title: 使用 wsl 小记录
tags: [wsl]
authors: leewei
date: 2022.04.01
description: 安装不难,想给它移个家挺难
---

## WSL基本命令
### 安装

**查看网络版本**

```shell
wsl --list --online
```

**安装**

```shell
wsl --install -d [name(中括号内及其中括号替换为你查询到的版本名称)]
```

**注意**以上安装有点慢，可以选择去微软商店下载更快。不过它默认安装在C盘，只有在C盘可以正常运行。

如果就是一个盘不用迁移，想安装在D盘可以试试下面的方式。

从以下网址下载相关压缩包

https://github.com/DDoSolitary/LxRunOffline/releases

```shell
./LxRunOffline.exe list // 列出已经安装的wsl

Ubuntu-20.04 // 打印的

./LxRunOffline.exe move -n Ubuntu-20.04(以上列出的名称) -d (目标地址)G:/WSL/Ubuntu-20.04

 ./LxRunOffline.exe get-dir -n Ubuntu-20.04
```

以上就差不多完成了安装



列出所有正在运行的子系统

```shell
wsl -l --running
```

导入和导出

```shell
wsl --export <Linux子系统名称> <xxx.tar>
wsl --import <新的Linux子系统名称> <新的Linux子系统路径> <xxx.tar>
```

删除和启动

```shell
wsl --distribution <Linux子系统名称>

wsl --unregister <Linux子系统名称>
```

停止

```shell
wsl --terminate <Linux子系统名称>
```

```shell
wsl -l --running
- 输出 Ubuntu20.04LTS 我的(视情况而定)

wsl --export Ubuntu20.04LTS d:\WSL\Ubuntu20.04.tar
- 
wsl --unregister Ubuntu20.04LTS // 注销Ubuntu20.04LTS
- 
wsl --import Ubuntu-20.04 d:\WSL\Ubuntu-20.04 d:\WSL\Ubuntu20.04.tar --version 2
- 

ubuntu2004 config --default-user Username // 设置新的名称
```



## 检查 WSL 状态

```shell
wsl --status
```



## 关闭

```shell
wsl --shutdown
```



## 找不到系统文件

```shell
1. wsl.exe --list --all (列出所有的linux系统(可能之前注册了没有取消注册))
2. wsl.exe --unregister (上面所列出的名字)
3. cmd 下再次输出bash 显示了信息
```

## 微软官方地址

https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands



