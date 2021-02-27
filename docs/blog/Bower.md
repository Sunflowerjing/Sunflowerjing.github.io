# Bower

1. 介绍
    * `包管理器`为网站提供一些包。例如: js 或 css
    * 一个命令, 管理本地所有的包。
    * 与 npm 的不同是, npm依赖 nodejs 并且要放在npm 网站上。(`模块化管理器`)
    * 松散型的 git (`前端的资源管理器`).节省更新版本不及时的问题

2. 安装
    * 全局安装: `npm install -g bower`
    * 执行: `bower`
    * 版本: `bower -v`

3. 功能
    * `cache`: bower 缓存管理
    * `help`: 显示 Bower 命令的帮助信息
    * `home`: 通过浏览器打开一个包的 github 发布页
    * `info`: 查看包的信息
    * `init`: 创建 bower.json 文件
    * `install`: 安装包到项目
    * `link`: 在本地bower 库建立一个项目链接
    * `list`:  列出项目已安装的包
    * `lookup`: 根据包名查询包的 url
    * `prune`:  删除项目无关的包
    * `register`: 注册一个包 
    * `search`: 搜索包 
    * `update`: 更新项目的包 
    * `uninstall`: 删除项目的包 
    


4. 应用 
    * 安装 jquery: `bower install jquery`
    * d3动画库: `bower install d3`
    * 查看项目中已导入的库以及依赖之间的关系: `bower list`
    * 安装 bootstrap: `bower install bootstrap`
    * 删除 jquery 破坏依赖: `bower uninstall jquery`
    * 安装低版本的jquery: `bower install jquery#1.7.2`
    * 查看已经安装的包: `bower list`
    * 更新包: `bower update jquery`
    * 查看缓存的包: `bower cache list`
    * 查看 d3 包的信息: `bower info d3`
    * 打开dojo官网: `bower lookup dojo`
    * 查询包含dojo的类库: `bower search dojo`


