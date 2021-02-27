# Parcel

* 使用node 8+
* 全局安装: `npm install -g parcel-bundler`
* 网址: `https://zh.parceljs.org/`

1. 功能 
    * 概念: 极速零配置 web 应用打包工具
    * 优点
        * `极速打包`: `Parcel` 使用 `worker` 进程去启用多核编译。同时有`文件系统缓存`，即使在重启构建后也能快速再编译。
        * `将所有的资源打包(Assets)`: Parcel 具备`开箱即用`的对 JS, CSS, HTML, 文件 及更多的支持，而且不需要插件。
        * `自动转换(Transforms)`: 如若有需要，Babel, PostCSS, 和PostHTML甚至 node_modules 包会被用于自动转换代码.
        * `零配置代码分拆(Code Splitting)`: 使用动态 import() 语法, Parcel 将你的输出文件束(bundles)分拆，因此你只需要在初次加载时加载你所需要的代码。
        * `热模块替换(HMR)`: Parcel 无需配置，在开发环境的时候会自动在浏览器内随着你的代码更改而去更新模块。
        * `友好的错误日志`: 当遇到错误时，Parcel 会输出 语法高亮的代码片段，帮助你定位问题。
2. 案例
    * `index.html` 默认入口文件
    ```javascript
    <html>
        <body>
            <script src="./index.js"></script>
        </body>
    </html>
    ```
    * `index.js` 
    ```javascript
    // 导入另一个组件
    import main from './main';
    main();
    ```
    * `main.js`
    ```javascript
    // 导入一个 CSS 模块
    import classes from './main.css';

    export default () => {
        console.log(classes.main);
    };
    ```
    * `main.css`
    ```javascript
    .main {
        /* 引用一张图片 */
        background: url('./images/background.png');
        color: red;
    }
    ```
    * 执行: `parcel index.html`
        * 只需要`运行 parcel index.html` 去启动一个`开发服务器`。
3. 怎样指定配置文件
    * `.babelrc`: 项目根目录创建





















