# NodeJS 基础概念

NodeJS官方网站: `https://nodejs.org`   

npm官方网站: `https://www.npmjs.com`

淘宝镜像: `npm.taobao.org`

cnpm: 中国 npm 服务器。安装命令: `npm install cnpm`

> `nvm` 管理 node 版本  
> `nrm` 管理 npm

## 什么是 `NodeJS`?
* NodeJS 本质是一个 JavaScript 解析器。
* NodeJS 是 JavaScript 的运行环境。
* NodeJS 是一个服务器程序。
* NodeJS 本身使用的是 V8 引擎。
* NodeJS 不是 web 服务器。

## 为什么要使用 `NodeJS`?
* 为了提供高性能的 web 服务。
* IO 性能强大
* 事件处理机制完善
* 天然能够处理 DOM
* 社区非常活跃, 生态圈日趋完善。

## 安装 `NodeJS`
* 查看node 版本执行: `node -v`
* 在终端执行: `node`d。 则进入 JavaScript 环境中。
* 退出 node 环境: `.exit`。 

## `NodeJS`内置的`包管理器npm`
* 每个版本的 Node 都会自带一个不同版本的 npm
* 全局安装 npm `npm install npm(包名) -g`
* 卸载包 `npm uninstall (包名)`
* 查找找包 `npm search (包名)`
* 查看 npm 帮助文档 `npm help`
* 查看 npm install 命令详细的解释 `npm help install`
* 查看 npm 的版本 `npm -v`
* 允许用户从 NPM 服务器下载别人编写的三方包到本地使用。
* 允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
* 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。
* `全局安装的 npm 包并不会在不同的 Node 环境中共享，因为这会引起兼容问题`
* 源 = 镜像(包含多个npm包)
```
react 
vue
webpack
以上都是第三方模块
执行npm publish 把reect, vue, webpack上传到npm官网
```
* `npm init` 我们都知道 `package.json` 文件是用来定义一个 `package` 的描述文件, 也知道`npm init` 命令用来初始化一个简单的 `package.json` 文件，执行该命令后终端会依次询问 `name, version, description` 等字段。
* `npm init --yes` npm init 执行默认行为。而如果想要偷懒，避免去一直按 enter，在命令后追加 --yes 参数即可，其作用与一路下一步相同。
* `依赖包安装` 依赖管理是 npm 的核心功能，原理就是执行 `npm install` 从 `package.json` 中的 dependencies, devDependencies 将依赖包安装到当前目录的 ./node_modules 文件夹中。
* 登录npm `npm adduser`
* 上传到npm `npm publish`


## `NVM` — Node Version Manager `(Node版本管理器)`
* `nvm 管理不同的 node`
* 列出已安装过的node `nvm ls`上面绿色箭头是当前正在使用的版本
* 切换node版本 `nvm use 4.2.2`
* 切换到最新版 `nvm use node`
* 安装多版本node `nvm install 4.2.2`
* 列出远程服务器上所有的可用版本 `nvm ls-remote`
* 用 nvm 给不同的版本号设置别名 `nvm alias awesome-version 4.2.2`
* 我们给 4.2.2 这个版本号起了一个名字叫做 awesome-version，然后我们可以运行：`nvm use awesome-version`
* 设置 default 这个特殊别名：`nvm alias default node`
* 安装最新版 Node `nvm install node` 
* 安装最新版 iojs `nvm install iojs `
* 安装最新不稳定版本的 Node `nvm install unstable`
* 注意⚠️ ：新打开一个`bash`，输入`nvm current`会发现显示为`→ nvm current system`，使用`nvm alias default <version>`命令来指定一个默认的node版本

## `NRM` — 使用nrm管理registry地址
* 用`nrm ls`命令查看默认配置，带*号即为当前使用的配置
* 下载nrm `npm install -g nrm`
* 添加registry地址   
`nrm add npm http://registry.npmjs.org`  
`nrm add taobao https://registry.npm.taobao.org`
* 切换npm registry地址:            
`nrm use taobao`  
`nrm use npm`  
* 查看npm源地址  
`npm config list`  
`结果:metrics-registry = "http://registry.npm.taobao.org/"`
* 修改`registry`地址，比如修改为淘宝镜像源。
```
npm set registry https://registry.npm.taobao.org/
如果有一天你肉身FQ到国外，用不上了，用rm命令删掉它
npm config rm registry
```
* nrm是专门用来管理和快速切换私人配置的 registry, 建议全局安装 `npm install nrm -g --save`
* 直接输入此 `nrm current` 命令查看当前使用的是哪个源
* 切换源 `nrm use cnpm(源的别名)`
* 用`nrm add` 命令添加`公司私有npm源`，如`http://registry.npm.360.org(随便写的)`，起个别名叫`qihoo`
`nrm add qihoo(源的别名) http://registry.npm.360.org`
* 测试下速度 `nrm test npm` 输出npm ---- 790ms
* 删除源 `nrm del qihoo(源的别名)`


## 设置npm的registry
* 以下不是 nrm 的方式，是以普通的方式设置源
* 原npm地址：`npm config set registry http://registry.npmjs.org`
* 设置国内镜像： `npm config set registry https://registry.npm.taobao.org`


## 区别 dependencies、devDependencies
* `dependencies` 表示我们要在生产环境下使用该依赖
* `devDependencies` 则表示我们仅在开发环境使用该依赖。
* 我们在执行 `npm install` 安装依赖时，通常都会将依赖的名称、版本要求写入 `package.json` 文件。
* 其中有两个命令行参数：
```
--save-prod 将依赖的名称、版本要求写入 dependencies
--save-dev 将依赖的名称、版本要求写入 devDependencies
```
* 举个例子，我要用 webpack 构建代码，所以在开发环节，它是必需的。但对普通用户来说，它是不必要的，所以安装 webpack 时
```
我要执行：
npm install webpack --save-dev
而不是：
npm install webpack --save-prod
```

## Node.js REPL 环境
* 进入此环境，只需要在终端中输入`node`即可。
1. `Ctrl + C`: 退出当前终端。
2. `Ctrl + C 按下两次`: 退出 Node REPL。
3. `Ctrl + D`: 退出 Node REPL。
4. `向上/向下 键`: 查看输入历史命令。
5. `tab 键`: 列出当前命令。
6. `.help`: 列出使用命令。
7. `.break`: 列出多行表达式。
8. `.clear`: 退出多行表达式。
9. `.save filename`: 保存当前的 Node REPL 会话到指定文件。
10. `.load filename`: 载人当前 Node REPL 会话的文件内容。




















