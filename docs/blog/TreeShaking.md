# TreeShaking

## 介绍
1. 别名：摇树 => 联想到树上的枯叶
2. 功能：在代码不运行的情况下，就能分析出未引用代码。删除冗余代码从而优化代码体积。
    * `tree shaking`  这个概念最开始是从 Rollup 实现
    * 随后 webpack2 开始支持了TreeShaking
3. 原理: 
    * ES6 Module引入进行静态分析，所以在`编译`的时候正确判断到底加载了那些模块
    * 静态分析程序流，`判断那些模块和变量未被使用或者引用，进而删除对应代码`
    * 对应到代码, 则为: `webpack 负责对代码进行标记，把 import & export 标记为以下 3 类`
        * 所有 `import` 标记为 `/* harmony import */`
        * 被使用过的 `export` 标记为 `/* harmony export ([type]) */`，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等
        * 没被使用过的 `import` 标记为 `/* unused harmony export [FuncName] */`，其中 [FuncName] 为 export 的方法名称
        * 是先找出 `已使用` 的代码，自然剩下的则是 `未使用` 的代码，最后通过注释的方式分别标注。


4. 使用前提: 
    * 交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法, 因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中）
    * 所以 Webpack 可以简单的分析出哪些 export 的被 import 过了
    ```js
    // 可行的 => ES5导出 export default App

    import foo from "foo";
    import bar from "bar";

    if (condition) {
        // foo.xxxx
    } else {
        // bar.xxx
    }
    ```
    * CommonJS 引入模块是动态引入的, 所以无法确定在实际运行前需要或者不需要某些模块。
    ```js
    // 不可行的 => ES6导出 module.exports = App
    
    let myDynamicModule;
    if (condition) {
        myDynamicModule = require("foo");
    } else {
        myDynamicModule = require("bar");
    }
    ```
5. 局限性:
    * class未使用的部分 `function` 不会标注 `unused export`。 可得 `webpack` 是对类整体进行标记的（标记为被使用），而不是分别针对内部方法。
    * 工具类函数尽量以单独的形式输出，不要集中成一个对象或者类，避免打包对象和类未使用的部分。


6. 案例: 有一个文件 `util.js` 里存放了很多工具函数和常量，在 `index.js` 中会导入和使用 `util.js`
    * util.js
    ```js
    export function funcA() {
    }

    export function funB() {
    }

    export const a = 'a';
    ```
    * main.js
    ```js
    import {funcA} from './util.js';
    funcA();
    ```
    * Tree Shaking 后的 util.js
    ```js
    export function funcA() {
    }
    ```
    * 总结: 由于只用到了 util.js 中的 funcA，所以剩下的都被 Tree Shaking 当作无用代码给剔除了。

## 接入 Tree Shaking
1. 在 `development` 模式下开启 `tree-shaking`
    * webpack.config.js 配置
    ```js
    module.exports = { 
        mode: "none", // 此模式不会打包压缩
        entry: {
            'index': './src/index.js'
        },
        output:{
            path: path.join(__dirname, './dist/'),
            publicPath: './',
            filename: 'build.js'
        },
        optimization: {
            usedExports: true  // 找出未被使用的模块
        },
    }
    ```
2. 运行 Webpack
    * 执行打包命令 `npx webpack`
    * 生成的`dist/build.js`的文件中有, 未用到的funB。
    * 启动 Webpack 时带上 `--display-used-exports` 参数, 方便追踪 Tree Shaking 的工作
3. 添加 webpack 的配置
    ```js
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

    module.exports = { 
        ...
        plugins: [
            new UglifyJsPlugin(),
        ]
        ...
    }
    ```
    * 每个版本 Tree Shaking 的配置
        * webpack2: 可以简单的通过在启动 Webpack 时带上 `--optimize-minimize` 参数, 接入 `UglifyJS`。需要配置babel
        * webpack3 需要配和 uglifyjsWebpackPlugin 使用
        * webpack4 把 mode 设置成 production。就可以进行默认的摇树行为了

4. 扩展
    * 当项目使用了大量第三方库时，会发现 Tree Shaking 似乎不生效了，原因是大部分 Npm 中的代码都是采用的 CommonJS 语法， 这导致 Tree Shaking 无法正常工作而降级处理。
    * 有些库发布到 Npm 上时会同时提供两份代码，一份采用 CommonJS 模块化语法，一份采用 ES6 模块化语法。并且在 `package.json `文件中分别指出这两份代码的入口。
    ```js
    // redux库为例, 发布到 Npm 上的目录结构如下
    node_modules/redux
    |-- es
    |   |-- index.js # 采用 ES6 模块化语法
    |-- lib
    |   |-- index.js # 采用 ES5 模块化语法
    |-- package.json
    ```
    * `package.json` 文件中有两个字段：
    ```js
    {
        "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
        "module": "es/index.js" // 指明采用 ES6 模块化的代码入口
    }
    ```
5. mainFields 字段
    * `mainFields` 用于配置采用哪个字段作为模块的入口描述
    * 配置 Webpack 的文件
    ```js
    module.exports = {
        resolve: {
            // 针对 Npm 中的第三方模块优先采用 module 中指向的 ES6 模块化语法的文件
            mainFields: ['module', 'browser', 'main']
        },
    };
    ```
    * 以上配置的含义是优先使用 `module` 作为入口，如果不存在 `module` 就采用 `browser` 或者 `main` 作为入口。







## common.js 和 es6 中模块引入的区别
1. 简介:
    * `CommonJS` 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。
    * 运行在浏览器端的 `JavaScript` 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: `AMD`)，用来对前端模块进行管理。
    * 自 ES6 起，引入了一套新的` ES6 Module` 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。
    * 但目前浏览器对 `ES6 Module` 兼容还不太好，我们平时在 Webpack 中使用的 `export` 和 `import`，会经过 Babel 转换为 CommonJS 规范。
2. 在使用上的差别主要有：
    * CommonJS 模块输出的是一个值的`拷贝`，ES6 模块输出的是`值的引用`。
    * CommonJS 模块是`运行时加载`，ES6 模块是`编译时输出接口`。
    * CommonJs 是`单个值导出`，ES6 Module可以`导出多个`
    * CommonJs 是`动态语法可以写在判断里`，ES6 Module `静态语法只能写在顶层`
    * CommonJs 的 `this 是当前模块`，ES6 Module的 `this 是 undefined`



<!-- esbuild  、 swc-loader  -->









