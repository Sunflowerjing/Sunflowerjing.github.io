# webpack基础

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
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const webpack = require('webpack');
    // commonJS 方式导出
    modules.exports = {
            // mode 打包模式。 
            // 默认 production, 即生产环境的配置, 打包文件压缩。
            // 开发环境配置 development 不被压缩
            mode: "production",
            // souecMap: 开启调试选项, 控制台显示源码第几行有 bug
            // 开发环境的配置 (cheap-module-eval-source-map)
            // 生成环境的配置 (cheap-module-source-map)
            devtool: "cheap-module-eval-source-map",  
            // 入口文件配置
            entry: {
                // 默认一个入口文件
                main: "./src/index.js",

                // 若多个入口文件
                index: "./src/index.js",
                demo: "./src/demo.js",
            },
            // 开发环境下安装。监听打包, 实现页面自动刷新  package.json 配置 => webpack-dev-server
            devServer: {
                // 定义服务访问目录
                contentBase: path.join("__dirname", "dist"),
                port:"9000",
                proxy: { // 代理
                    '/api': 'local:8081'
                },
                hot: true
            },
            // 输出, 默认打包到 dist 下面的 main.js
            output: {
                // 自定义打包后的文件名字, 默认一个打包文件
                fileName: "index.js" 
                // 占位符 若多个打包口文件配置
                fileName: "[name].[hash:5].js"
                // 打包后的路径. path.resolve() 将2个相对路径进行链接,生成绝对路径
                path: path.resolve(__dirname, 'dist'),
                // 实现注入地址的更改 (即打包后的 html 引入的 js 为cdn 上的)
                publicPath: "http://jingjing.com"
            },
            // loader 能拿到源码
            module: {
                rules: [
                    {
                        test:/\.js$/,
                        loader: 'babel-loader',  
                        options:{
                            // preset-env ES6 语法转 ES5+语法.  不推荐使用
                            presets: [["@babel/preset-env", {
                                // 必须同时设置 core-js@3  (babel 新特性添加 corejs3 中)
                                // 默认设置 core-js@2(babel 中不会添加新特性)

                                // 按需引用 usage: 只会将文件中用到的方法引用
                                useBuiltIns: "usage",  // entry:只支持引用一次   false:
                                corejs:3
                            }]],
                            // 推荐使用
                            plugins: [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        corejs:3
                                    }
                                ]
                            ]
                        },
                        // 过滤 node-modules 中的文件
                        exclude: /node-modules/
                    },
                    {
                        // 正则匹配图片. 指定检测什么文件
                        test: /\.{jpg|png|gif}$/,
                        use: {
                            loader: 'url-loader', // 对文件进行加载处理
                            options: {
                                // 打包后的文件名 hash5
                                name: '[name].[hash:5].[ext]',
                                // 打包后的文件路径
                                outputPath: "assets",
                                // 小于2048才打成 base64, 大于正常展示
                                limit: 2048
                            }
                        }
                    },
                    {
                        // 正则匹配图片. 指定检测什么文件
                        test: /\.{less|css}$/,
                        // 执行顺序,从下到上
                        use: [
                            {
                                // 通过 style 标签, 将 css 直接注入到 html 页面
                                loader: 'style-loader', // css 注入到 html 中
                                options: {}
                            },
                            {
                                loader: 'css-loader' // css 转 commonJS
                            },
                            {
                                loader: 'postcss-loader', 
                                options: {
                                    // css 样式加前缀, css 编译环节 中间进行处理
                                    plugins: [require("autoprefixer")]
                                    // 或者 在项目的根目录中建立 postcss.confing.js
                                    // module.export = {
                                    //      plugins: [require("autoprefixer")]
                                    // }
                                }
                            },
                            {
                                loader: 'less-loader' // less 转 css
                            },
                        ]
                    }
                ]
            },
            // plugins:  webpack 生命周期 做相关的事情, 扩展 webpack , 可以实现 loader 完成 loader 不能完成的复杂功能, 丰富自定义的 api, 完成webpack每个环节
            plugins: [
                // 创建 html 文件
                new HtmlWebpackPlugin({
                    template: "./src/index.html"
                }),
                // 每次清除 dis 目录
                new CleanWebpackPlugin(),
                // 热更新
                new webpack.hotModuleRepalceMentPlugin()
            ]
    }
    ```
    3. 执行
        * 默认执行 index.js: `npx webpack`
        * 若配置了 webapck.config.js: `npx webpack --config  webapck.config.js`
        * 或者在 package.json 中的 scripts写: `build: webpack`
        * 在 package.json 中的 scripts写, 监听 webpack 文件更新: `build: webpack --watch`
    4. `loader 文件预处理器`
        * `file-loader` 字体、文件处理
            * 发现图片模块
            * 打包到 dist 目录下, 改一个名字, 自定义
            * 移动到 dist 目录之后, 得到图片的名称
            * 然后作为返回值, 返回给我们引入的变量
        * `url-lader` 图片处理

## sourceMap
1. `功能`: 定位错误



## 热更新
1. `HMR 热更新`: hot module replacement
2. 只更新修改部分
3. 案例
    * 使用 webpack-dev-server 作为服务器启动
    * devServer 配置中 hot:true
    * plugins hotModuleRepalceMentPlugin
    * js 模块中增加 module.hot.acceput增加 hmr 代码
    ```javascript
    if(module.hot){
        module.hot.accept('./list', () => {  // 开启热更新模块
            consolr.log('更新 list 文件模块');
            list();
        });
        module.hot.decline("./list"); // 关闭热更新模块
    }
    ```

## babel
1. `功能`: js 编译器
2. 安装: 
    * babel 核心库: `npm install @babel/core`  
    * 命令行中使用: `npm install @babel/cli` 
    * `npm install @babel/preset-env`
        * @babel/preset-env  ES6+语法转换
        * 标准引入的语法: 箭头函数 let const 等等。可以转换
        * 标准引入的全局变量, 部分原生对象新增的原型链上的方法。不可以 map promise symbol set
        * 可以使用 `@babel/polyfill`, 是以全局变量的形式将方法注入, 开发类库, UI 组件时, 全局变量的污染。 配合 corejs
        * `@babel/plugin-transform-runtime`:  以闭包方式注入, 保证全局变量不被污染。配合@babel/runtime-corejs3。推荐使用
    * `npm install babel-loder`


## 总结
1. 需要什么, 就安装什么。loader plugins
2. 注意: 版本匹配, 代码. 使用的库查看 git 
3. 官网推荐 loaders 和 plugins 


