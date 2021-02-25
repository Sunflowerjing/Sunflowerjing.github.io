# rollup

1. 功能
    * module 打包工具, 打出来的包可以支持浏览器 和 node使用。 
    * 自带 - 静态依赖分析树: `Tree-shaking`。移出不用的代码
    * 可以生成`多模式模块`。 AMD(require) - CommonJS - ES2015 - Globals(闭包) - UMD
    * 支持 ES6 模块。有自己的一套 babel, 生成浏览器支持的原生代码
2. 配置
    * 安装: `npm install rollup -D`
    * 配置文件: rollup.config.js
    ```javascript
    export default {
        entry: "src/main.js",
        format: 'amd',
        sourceMap: true, 
        dest:"build/bundle.js "
    }
    ```
3. 优点:
    * 相比 webpack 打包出来的内容, 更干净和纯粹。
    * 适合 SDK 开发。webpack 适合工程开发



