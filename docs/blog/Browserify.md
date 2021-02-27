# Browserify

1. 功能
    * 所有的依赖，可以在浏览器中用。例如给 node 使用的库，也可以支持浏览器中用。
    * 不支持 ES6
    * 例如:
    ```javascript
    // cheerio是jquery核心功能的一个快速灵活而又简洁的实现，主要是为了用在服务器端需要对DOM进行操作的地方

    // index.js
    var cheerio = require("cheerio");
    var test  = require('./test');
    test(cheerio);

    // test.js
    module.exports = function(cheerio){
        console.log('我是服务端的人', cheerio);
    }
    ```
2. 安装
    ```javascript
    npm install -g browserify
    ```

3. 执行
    ```javascript
    browserify index.js(编译原始文件) -o bundle.js(编译后生成的输出文件)
    ```

4. 与其他包的区别
    * `webpack`: 包管理器,loader
    * `gulp(基于文件流) / grunt(基于文件 I/O)`: gulp更快, node
        * 与 webpack 比较: `gulp是啥都开发者来`, `webpack是啥都由webpack做`
    * `yo` : 发布一些自己的模块
    * `bower`: 安装依赖
    * `browserify`: 能够让本地的 js 应用服务端的js, 具有 require 能力
    * `rollup`: tree-shaking~ cmd amd ...