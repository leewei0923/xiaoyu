---
title: 使用 wsl 小记录
tags: [wsl]
authors: leewei
date: 2022.04.01
description: 安装不难,想给它移个家挺难
---

## WSL常用操作
列出所有安装的子系统

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



## 找不到系统文件

```shell
1. wsl.exe --list --all (列出所有的linux系统(可能之前注册了没有取消注册))
2. wsl.exe --unregister (上面所列出的名字)
3. cmd 下再次输出bash 显示了信息
```



https://github.com/DDoSolitary/LxRunOffline/releases

```
./LxRunOffline.exe list
Ubuntu-20.04
./LxRunOffline.exe move -n Ubuntu-20.04 -d G:/WSL/Ubuntu-20.04
 ./LxRunOffline.exe get-dir -n Ubuntu-20.04

```



