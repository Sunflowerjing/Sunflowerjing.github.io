# package文件学习



* `browser` VS `module` VS `main`
    * 在`不同环境`下 `import 一个 npm 包`时, 加载的是 `npm 包` 中哪个文件? `main 字段中指定的文件`
    * npm 包分为: 只允许在`客户端`使用的，只允许在`服务端`使用的，`浏览器/服务端`都可以使用。
    * 开发一个 npm 包, 同时兼容支持 `web端` 和 `server端`。需要在`不同环境下, 加载npm包的不同入口文件。`所以衍生出来: `module` 和 `browser`字段.

## 文件优先级
* 模块规范有 `ESM` 和 `commonJS` 两种。
* 为了能 `在node环境` 下原生执行 `ESM` 规范的脚本文件，`.mjs` 文件就应运而生。
* 当存在 `index.mjs` 和 `index.js` 这种同名不同后缀的文件时，`import './index'` 或者 `require('./index')` 是会优先加载 `index.mjs` 文件的。
* 也就是说，优先级 `mjs > js`


## browser，module 和 main 字段

### 字段定义
* `main`: 定义了 `npm` 包的入口文件，`browser 环境和 node 环境`均可使用。
* `module`: 定义 `npm` 包的 ESM 规范的入口文件，`browser 环境和 node 环境`均可使用。
* `browser`: 定义 `npm` 包在 `browser 环境`下的入口文件。


### 使用场景与优先级
* 例如: npm 包 test 有以下目录结构
```javascript
----- lib
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```
* 其中 `*.js` 文件是使用 commonJS 规范的语法(`require('xxx')`)，`*.mjs` 是用 ESM 规范的语法(`import 'xxx'`)
* 其 `package.json` 文件:
```javascript
"main": "lib/index.js",  // main 
"module": "lib/index.mjs", // module

// browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
"browser": {
    "./lib/index.js": "./lib/index.browser.js", // browser+cjs
    "./lib/index.mjs": "./lib/index.browser.mjs"  // browser+mjs
},

// "browser": "./lib/index.browser.js" // browser
```
* 根据上述配置, package.json 指定的入口可以有: 以下5种
    * `main`
    * `module`
    * `browser`
    * `browser+cjs`
    * `browser+mjs`

#### webpack + web + ESM
* 最常见的使用场景，通过 `webpack` 打包构建我们的 `web 应用`，模块语法使用 `ESM`
* 使用方式: `import test from 'test'`
* 实际上加载优先级是 `browser = browser+mjs > module > browser+cjs > main`, 也就是说 `webpack` 会根据这个顺序去寻找字段指定的文件，直到找到为止。
* 参考流程图:
![webpack + web + ESM](模块.png)

#### webpack + web + commonJS
* `const test = require('test')`
* 构建 web 应用时，使用 `ESM 或者 commonJS 模块`规范对于加载优先级并没有任何影响
* 优先级依然是 `browser = browser+mjs > module > browser+cjs > main`

#### webpack + node + ESM/commonJS
* 使用 `webpack 构建项目`的时候，有一个 `target` 选项，默认为 web，即进行 web 应用构建。
* 当需要进行一些 `同构项目`，或者`其他 node 项目`的构建的时候，我们需要将 `webpack.config.js` 的`target` 选项设置为 `node` 进行构建。
* `import test from 'test'`  或者 `const test = require('test')`
* 优先级是： `module > main`

#### node + commonJS
* 通过 `node test.js` 直接执行脚本
* `const test = require('test')`
* 只有 `main` 字段有效。

#### node + ESM
* 通过 `--experimental-modules` 可以让 `node` 执行 ESM 规范的脚本(必须是 mjs 文件后缀)`node --experimental-modules test.mjs`
* `import test from 'test'`
* 只有 `main` 字段有效。

### 总结
* 如果 `npm` 包导出的是 `ESM 规范的包`，使用 `module`
* 如果 `npm` 包只在 `web 端`使用，并且`严禁在 server 端`使用，使用 `browser`
* 如果 `npm` 包只在 `server 端`使用，使用 `main`
* 如果 `npm` 包在 `web 端`和 `server 端`都允许使用，使用 `browser 和 main`


























