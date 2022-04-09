---
title: git学习记录(一)————git stash
tags: [git]
authors: leewei
date: 2022.04.06
draft: true
description: git stash 的理解？应用场景？
---



![640](https://qi.7miaoyu.com/typora/640.png)

## git stash 是什么



在 git 中，保存当前工作进度，会把暂存区和工作区的改动进行保存，这些修改会保存在一个栈上。后面需要需要该存档的时候可以再调取出来，重新应用这些更改的代码。

默认的情况下，`git stash`会缓存下列状态的文件

- 暂存区的已修改的文件
- git 跟踪的但并未添加到暂存区的修改

以下的状态的文件不会缓存

- 在工作目录中新的文件
- 被忽略的文件

如果想要上述的文件都被缓存，可以使用`-u`或者`--include-untracked`可以工作目录新的文件，使用`-a`或者`--all`命令可以当前目录下的所有修改



## 如何使用

**常见命令**

- git stash  存储当前的工作进度
- git stash save  



`git stash save`可以用于存储修改.并且将`git`的工作状态切回到`HEAD`也就是上一次合法提交上

​	--keep-index 或者 -k 只会存储为加入 git 管理的文件

   --include-untracked 为追踪的文件也会被缓存,当前的工作空间会被恢复为完全清空的状态

 -a 或者 --all 命令可以当前目录下的所有修改，包括被 git 忽略的文件



- git stash list   

显示保存进度的列表。也就意味着，`git stash`命令可以多次执行，当多次使用`git stash`命令后，栈里会充满未提交的代码。



- git stash pop  

`git stash pop` 从栈中读取最近一次保存的内容，也就是栈顶的`stash`会恢复到工作区

也可以通过 `git stash pop` + `stash`名字执行恢复哪个`stash`恢复到当前目录

如果从`stash`中恢复的内容和当前目录中的内容发生了冲突，则需要手动修复冲突或者创建新的分支来解决冲突



- git stash apply

将堆栈中的内容应用到当前目录，不同于`git stash pop`，该命令不会将内容从堆栈中删除

也就说该命令能够将堆栈的内容多次应用到工作目录中，适应于多个分支的情况

同样，可以通过`git stash apply` + `stash`名字执行恢复哪个`stash`恢复到当前目录



- git stash show

查看堆栈中最新保存的`stash`和当前目录的差异

通过使用`git stash show -p`查看详细的不同

通过使用`git stash show stash@{1}`查看指定的`stash`和当前目录差异



- git stash drop

`git stash drop` + `stash`名称表示从堆栈中移除某个指定的stash



- git stash clear

删除所有存储的进度



## 应用场景

当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过`git pull`解决

但是如果可能发生冲突怎么办.直接`git pull`会拒绝覆盖当前的修改，这时候就可以依次使用下述的命令：

- git stash
- git pull
- git stash pop

或者当你开发到一半，现在要修改别的分支问题的时候，你也可以使用`git stash`缓存当前区域的代码

- git stash：保存开发到一半的代码
- git commit -m '修改问题'
- git stash pop：将代码追加到最新的提交之后