# webpack高级
* 拆分依赖到代码块, 按需加载
* 快速初始化加载
* 所有的静态资源都可以当做模块
* 第三方模块库
* 自定义模块打包
* 适合大型项目 


## treeShaking 摇树优化
1. 优点
    * `无用的代码, 自动踢出`。 
    * 依赖 ES6 模块语法。
    例如: 引入 fn1和fn2 两个函数。则只调用了 fn1, 则不会打包 fn2。
2. webpack版本支持
    * `webpack3`: 则需要引入 `ugligyjsWebpackPlugin`
    * webpack4: 将 `mode 设置为 production`, 则直接进行摇树优化。
3. 使用库
    * `import {check} from 'lodash'`
    * 直接使用 `lodash` 是不行的, 因为 lodash 不是使用 commonJs或 ES6 模块的写法。即`不是 ES6 模块系统`。
    * 替换方案: `lodash-es` ES6模块语法库


## 打包环境的区分
   * `dev 开发环境`: 
        * devServer
        * sourceMap
        * 接口代理: proxy
    * `prod`: 
        * treeShaking
        * 代码压缩
        * 提供公共代码
    * `相同点`
        * 同样的入口
        * 部分相同代码处理
    * `方案`
        * webpack.prod.js 生产环境
        * webpack.dev.js 开发环境
        * webpack.base.js 开发环境与生成环境共用的代码
        * 借助一个工具 webpack-merge
    * 案例
        * `webpack.prod.js`
            ```javascript
            const webpack = require('webpack');
            const merage = require('webpack-merge');
            const baseConfig = require('./webpack.base.js');
            const prodConfig = {
                mode: 'production',
                devtool: 'none'
            }
            module.exports = merage(baseConfig, prodConfig)
            ```
        * `webpack.dev.js`
            ```javascript
            const webpack = require('webpack');
            const merage = require('webpack-merge');
            const baseConfig = require('./webpack.base.js');
            const devConfig = {
                mode: 'development',
                devtool: "cheap-module-eval-source-map",  
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
                plugins: [
                    // 热更新
                    new webpack.hotModuleRepalceMentPlugin()
                ]
            }
            module.exports = merage(baseConfig, devConfig)
            ```
        * `webpack.base.js`
            ```javascript
            const path = require('path');
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            const CleanWebpackPlugin = require('clean-webpack-plugin');
            const webpack = require('webpack');
            // commonJS 方式导出
            modules.exports = { 
                    // 入口文件配置
                    entry: {
                        // 默认一个入口文件
                        main: "./src/index.js",

                        // 若多个入口文件
                        index: "./src/index.js",
                        demo: "./src/demo.js",
                    },
                    // 输出, 默认打包到 dist 下面的 main.js
                    output: {
                        // 自定义打包后的文件名字, 默认一个打包文件
                        fileName: "index.js" 
                        // 占位符 若多个打包口文件配置
                        fileName: "[name].[hash:5].js"
                        // 打包后的路径. path.resolve() 将2个相对路径进行链接,生成绝对路径
                        path: path.resolve(__dirname, '../dist'),
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
                    ]
            }
            ```
        * package.json
        ```javascript
        "scripts": {
            "build:dev": "webpack --config ./config/webpack.dev.js",
            "build:prod": "webpack --config ./config/webpack.prod.js",
            "dev:server": "webpack-dev-server --config ./config/webpack.dev.js",
        }
        ```
## js打包优化,代码拆分方式
1. `入口配置`: entry 多入口
    * 配合 `ProvidePlugin` 使用
    * 例如: 引入 jquery,单独打包出去
    ```javascript
    const jquery = require('jquery');
    modules.exports = { 
        entry: {
            index: "./src/index.js",
            demo: "./src/demo.js",
            jquery: "jquery"
        },
        plugins: [
            // 则不需要在页面单独引入 jquery
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    }
    ```
2. 抽取公共代码: splitchunks
    * webpack4 新版本中加了 `splitChunksPlugins`, 其实是取代前版本中的 `commonChunksPlugins`, 二者的功能是相同的
    * `splitChunksPlugins优点`: 打包速度比之前更快了
    * 配置, 在 webpack.config.js
    ```javascript
    module.exports = {
        optimization: {
            splitChunks: {
                chunks: 'all',  // 设置为 all 全部模块进行处理。 参数: initial async all 
                minSize: 30000, // 抽取文件前的最小 大小, 符合这个要求 就进行代码抽取
                maxSize: 0,  // 抽取文件前的最大值是多大
                minChunks: 1, // 表示某包, 被引用的次数。符合此条件就进行抽取
                name: false, // 表示自定义文件名字
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录下的文件, 就进行抽取
                        priority: -10, // 优先级
                        reuseExistingChunk: true,
                        filename:'jquery.js' // 最终打包后的文件名字
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,  // 
                        reuseExistingChunk: true, // 表示模块打包过, 复用之前的就不用打包了
                    },
                }
            }
        }
    }
    ```
3. 动态加载: 按需加载 懒加载
    * 配合, 引入动态加载的插件: `@babel/plugin-syntax-dynamic-import`
    * `babel` 中的配置
    ```javascript
    {
        "plugins": [
            "@babel/plugin-syntax-dynamic-import"
        ]
    }
    ```
    * 业务代码写法, 懒加载
    ```javascript
    // 异步方式 
    import (/*webpackChunkName: 'jquery'*/ 'jquery').then({default:$} => {
        console.log($.length);
    })
    ```

## css 文件代码分割

1. css 代码与 js 代码打包后进行分割: `mini-css-extract-plugin` (将 js中的css代码, 提取出来)
2. 代码分割生成环境的配置: 
    * `webpack.prod.js`
        ```javascript
        const webpack = require('webpack');
        const merage = require('webpack-merge');
        const baseConfig = require('./webpack.base.js');
        const MiniCssExtractPlugin= require('mini-css-extract-plugin');
        const Opti= require('optimize-css-assets-webpack-plugin');
        const Terser= require('terser-webpack-plugin');
        const Bundle = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
        const prodConfig = {
            mode: 'production',  // 设置 production 默认为自动压缩, 由于配置了optimization, 则默认压缩失效, 所以手动设置压缩js
            devtool: 'none',
            // 配置 进行 CSS 压缩
            optimization:{
                minimizer: [new Ooti({}), new Terser()]
            }
            module: {
                rules: [
                    {
                        // 正则匹配图片. 指定检测什么文件
                        test: /\.{less|css}$/,
                        // 执行顺序,从下到上
                        use: [
                                {
                                    // 通过 style 标签, 将 css 直接注入到 html 页面
                                    loader: MiniCssExtractPlugin.loader, // css 注入到 html 中
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
                                }
                            ]
                    }
                ]
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: "[name].[hash:5].css"
                }),
                new Bundle()
            ]
        }
        module.exports = merage(baseConfig, prodConfig)
        ```
3. 压缩 css:  `optimize-css-assets-webpack-plugin`
4. 配置代码分割, 设置了optimization:  要注意影响到 JS 代码压缩, 需要手动配置 `terser-webpack-plugin` (js压缩)

## 代码包分析工具
1. 代码包越来越大, 帮助分析代码包中的内容: `webpack-bundle-analyzer`

## 获取环境参数
* 推荐插件: `yargs`
* webpack.base.js
    ```javascript
    const webpack = require('webpack');
    const argv = require('yargs').argv; 
    console.log('环境参数', argv.myenv, argv.env); // 输出 me production

    // 使用方式 判断是生成环境还是开发环境
    const modeFlag = argv.env === "production"
    ```
* package.json
    ```javascript
    "scripts": {
        "build:dev": "webpack --config ./config/webpack.dev.js",
        "build:prod": "webpack --config ./config/webpack.prod.js --env production --myenv me",
        "dev:server": "webpack-dev-server --config ./config/webpack.dev.js",
    }
    ```









