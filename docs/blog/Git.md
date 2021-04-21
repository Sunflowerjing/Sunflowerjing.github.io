# Git

##  常见的操作

## 查看分支
1. 查看项目的分支们(包括本地和远程): `git branch -a `
2. 删除本地分支: `git branch -d <BranchName>`

## 查看远程地址
1. `git remote -v`

## 查看历史提交信息
1. `git log`

## git丢弃本地修改的所有文件（新增、删除、修改）
1. `git checkout . `:本地所有修改的。没有的提交的，都返回到原来的状态
2. `git stash`: 把所有没有提交的修改暂存到stash里面。可用`git stash pop`回复.
3. `git reset --hard HASH`: 返回到某个节点，不保留修改。
4. `git reset --soft HASH`: 返回到某个节点。保留修改。
5. `git clean -df`: 返回到某个节点
```
-n 显示 将要 删除的 文件 和  目录
-f 删除 文件
-df 删除 文件 和 目录
```
6. 也可以使用: `git checkout . && git clean -xdf`
7. 放弃本地修改，直接覆盖之: `git reset --hard`  `git pull`

https://blog.csdn.net/ustccw/article/details/79068547

## 合并分支
1.  将 A 分支的内容合并到 B 分支上面: `当前在 B 分支下面执行: git pull origin A`


2. git 维护 commit 历史线小技巧。

    * git merge ${yourBranch}   // 合并分支，但commit历史是线性的，从git log —graph 无法看出分支合并记录。
    * git merge ${yourBranch}  —no-ff   // 推荐，能看出分支合并记录。
    * git commit —amend    // 追加上一次提交。 比如上一次提交时候遗漏了一些修改， 可以将遗漏的更新追加到上一个commit中。
    * git rebase    // commit合并。 比如你在你的开发分支中，提了 N 个commit , 而message 都是瞎写的，合并到主分支的时候建议使用这个来合并你的乱七八糟的commit历史，免得污染主分支的提交历史。

    * 高频使用是 git merge --no-ff 和 git commit --amend




