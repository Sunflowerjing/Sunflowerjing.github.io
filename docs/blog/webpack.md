# webpack

* 基于 nodeJS 的`模块化打包工具`
* 生成 package.json, 执行 `npm init -y`
* 一切皆模块

## webpack 是什么
1. 本质上是一个 JavaScript 应用程序的静态模块打包器(Static Module bundle)。

2. 模块是什么
    * ES2015 的 import 语句
    * CommonJS require 语句
    * AMD define 和 require 语句
    * Css/Scss/Less文件中的 import
    * 样式或html文件的图片、字体文件

3. 核心概念
    * loader 
    * plugins: 插件
    * Entry: 入口
    * Output: 出口
    * sourceMap: 代码调试, 源码和打包
    * DevServer:
    * Hmr:热更新
    * Babel:

4. `安装 webpack`
    * `npm install webpack --save` (--save表示生产环境也会使用)
    * `npm install webpack-cli -D` (-D 表示开发环境, 相当于--save-dev)
    * npx 工具: 表示从项目中的目录去找, 不回从全局中去找。
    * 安装 yarn: `npm install yarn`
    * 安装 nrm: `yarn install nrm`
    * nrm ls 查看有哪些源可以使用
    * nrm use taobao: 切换到淘宝的源
    * nrm test:  查看源的网速

## webpack 配置文件
   1. webpack 配置文件: `webpack.confing.js`
   2. 案例
    ```javascript
    cosnt path = require('path');
    // commonJS 方式导出
    modules.exports = {
            // mode 打包模式。 
            // 默认 production, 即生产环境的配置, 打包文件压缩。
            // 开发环境配置 development 不被压缩
            mode: "production",
            // 入口文件配置
            entry: {
                main: "./src/index.js"
            },
            // 输出, 默认打包到 dist 下面的 main.js
            output: {
                // 自定义打包后的文件名字
                fileName: "index.js" 
                // 打包后的路径. path.resolve() 将2个相对路径进行链接,生成绝对路径
                path: path.resolve(__dirname, 'dist') 
            },
            // loader 能拿到源码
            module: {
                rules: [
                    {
                        // 正则匹配图片. 指定检测什么文件
                        test: '/\.{jpg|png|gif}$/',
                        use: {
                            loader: 'file-loader' // 对文件进行加载处理
                        }
                    },
                    {
                        // 正则匹配图片. 指定检测什么文件
                        test: '/\.{less|css}$/',
                        use: [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'less-loader'
                            },
                        ]
                    }
                ]
            }
            // plugins webpack 生命周期 做相关的事情
    }
    ```
    3. 执行
        * 默认执行 index.js: `npx webpack`
        * 若配置了 webapck.config.js: `npx webpack --config  webapck.config.js`
        * 或者在 package.json 中的 scripts写: `build: webpack`
    4. loader 
        * `file-loader`
            * 发现图片模块
            * 打包到 dist 目录下, 改一个名字, 自定义
            * 移动到 dist 目录之后, 得到图片的名称
            * 然后作为返回值, 返回给我们引入的变量










