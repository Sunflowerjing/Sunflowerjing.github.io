# JS 模块规范

## commonJS
1. 特点: 
    * 模块可以多次加载，但是`只会在第一次加载时运行一次`，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
    * 模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——`同步加载`。
2. 环境：`服务器环境`
3. 应用：nodejs的模块规范是参照commonJS实现的。
4. 语法：
    * 导入：`require('路径')`
    * 导出：`module.exports` 和 `exports`
    * 注意：`module.exports` 和 `exports`的的区别是: 
        * `exports 是指向的 module.exports 的引用`，相当于Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行 `var exports = module.exports;`这样的命令。
        * module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
        * require() 返回的是 module.exports 而不是 exports
5. demo1
    ```javascript 
    // a.js
    // 相当于这里还有一行：var exports = module.exports;代码
    exports.a = 'Hello world';  // 相当于：module.exports.a = 'Hello world';

    // b.js
    var moduleA = require('./a.js');
    console.log(moduleA.a);     // 打印出hello world
    ```
6. demo2:
    * exports 只是 module 对象的 exports 的一个引用，由于 exports 和 module.exports 指向同一块内存区域，所以修改 exports 对象的数据，那么 module.exports 也会随之改变。
    * 相关文章: https://cnodejs.org/topic/5231a630101e574521e45ef8
    ```js
    const hello = function () {
        console.log('Hello world');
    }

    console.log(exports); // {}
    console.log(module.exports); // {}

    exports.hello = {
        hello
    }  

    console.log(exports); //{ hello: { hello: [Function: hello] } }
    console.log(module.exports); // { hello: { hello: [Function: hello] } }
    ```

7. demo3:
    * 给 `module.exports` 是直接等于一个新的对象，那么其将指向一块新的内存区域，而此时 exports 指向的仍然是之前的内存区域，所以二者的值会不一样，
    * 但是此时在其他文件内引入 hello.js 文件，仍然可以调用 hello() 方法，这说明了导出的是 module.exports 而不是 exports。
    ```js
    const hello = function(){
        console.log('hello')
    }

    console.log(module.exports); // {}

    module.exports = {
        hello
    }

    console.log(module.exports) // { hello: [Function: hello] }
    console.log(exports) // {}
    ```


## AMD
1. 特点: 
    * `异步加载`
    * 管理模块之间的依赖性，便于代码的编写和维护。
2. 环境：`浏览器环境`
3. 应用：requireJS是参照AMD规范实现的
4. 语法：
    * 导入：`require(['模块名称'], function ('模块变量引用'){// 代码});`
    * 导出：`define(function (){return '值');`
5. demo
    ```javascript
    // a.js
    define(function (){
    　　return {
    　　　a:'hello world'
    　　}
    });
    // b.js
    require(['./a.js'], function (moduleA){
        console.log(moduleA.a); // 打印出：hello world
    });
    ```


## CMD
1. 特点: 
    * CMD是在AMD基础上改进的一种规范，和AMD不同在于对依赖模块的执行时机处理不同，`CMD是就近依赖，而AMD是前置依赖`。
2. 环境：`浏览器环境`
3. 应用：seajs是参照UMD规范实现的，requireJS的最新的几个版本也是部分参照了UMD规范的实现
4. 语法：
    * 导入：`define(function(require, exports, module) {});`
    * 导出：`define(function (){return '值');`
5. demo
    ```javascript
    // a.js
    define(function (require, exports, module){
    　　exports.a = 'hello world';
    });
    // b.js
    define(function (require, exports, module){
        var moduleA = require('./a.js');
        console.log(moduleA.a); // 打印出：hello world
    });
    ```

## UMD
1. 特点：
    * 兼容`AMD`和`commonJS`规范的同时，还兼容全局引用的方式
2. 环境：浏览器或服务器环境
3. 应用：无
4. 语法：
    * 无导入导出规范，只有如下的一个常规写法：
5. demo
    ```javascript
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            //AMD
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            //Node, CommonJS之类的
            module.exports = factory(require('jquery'));
        } else {
            //浏览器全局变量(root 即 window)
            root.returnExports = factory(root.jQuery);
        }
    }(this, function ($) {
        //方法
        function myFunc(){};
        //暴露公共方法
        return myFunc;
    }));
    ```

## ES6 module (ESM)
1. 特点：
    * 按需加载（编译时加载）
    * `import`和`export`命令只能在模块的顶层，不能在代码块之中（如：if语句中）,import()语句可以在代码块中实现异步动态按需动态加载
2. 环境：`浏览器或服务器环境（以后可能支持）`
3. 应用：`ES6的最新语法支持规范`
4. 语法：
    * 导入：`import {模块名A，模块名B...} from '模块路径'`
    * 导出：`export和export default`
    * `import('模块路径').then()方法`
    * 注意：`export只支持对象形式导出`，不支持值的导出，`export default命令用于指定模块的默认输出，只支持值导出`，但是只能指定一个，本质上它就是输出一个叫做default的变量或方法。
5. demo
    ```javascript
    /*错误的写法*/
    // 写法一
    export 1;

    // 写法二
    var m = 1;
    export m;

    // 写法三
    if (x === 2) {
        import MyModual from './myModual';
    }

    /*正确的三种写法*/
    // 写法一
    export var m = 1;

    // 写法二
    var m = 1;
    export {m};

    // 写法三
    var n = 1;
    export {n as m};

    // 写法四
    var n = 1;
    export default n;

    // 写法五
    if (true) {
        import('./myModule.js')
        .then(({export1, export2}) => {
        // ...·
        });
    }

    // 写法六
    Promise.all([
        import('./module1.js'),
        import('./module2.js'),
        import('./module3.js'),
    ])
    .then(([module1, module2, module3]) => {
        ···
    });
    ```


## export 和 export default 区别
1. `export` 和 `export default` 均可用于导出（常量 | 函数 | 文件 | 模块）等。
2. 可以在其他文件中通过 `import+`（常量 | 函数 | 文件 | 模块）名的方式，将其导入，以便能够进行使用。
3. 在一个文件或者模块中，`export、import` 可以有多个，但 `export default` 仅有一个。
4. 通过 `export` 方式导出，在导入时要用花括号 `{ }`。
    * 对于 `export {name}; ` 命名导出的，在导入的时候必须使用相应对象的`相同名称`
    * 引用的时候：import { name } from './文件名.js'。
5. 而通过 export default 方式导出的，则不需要。
    * 如通过 `export default` 导出 `export default utils;` 则在使用的时候不用加花括号，且导入时的名字可以自定义，如： `import myUtils from './utils.js'`。
    * 对于默认方式导出的，则导入的时候，名称可以随便取。默认导出：不能使用 let，var 或 const 作为默认导出。
 

## import和require的区别
1. 遵循规范:
    * import 是 ES6 的一个语法标准，兼容浏览器需要转化成 ES5 的语法 require 采用 CommonJS 规范。
2. 调用时间:
    * `import` 是编译时调用，必须放在代码的开头, `require` 是运行时调用，可以运用在代码的任何地方。
3. 实现过程:
    * `import` 是解构过程，由于浏览器兼容问题，需要在 node 中用 babel 将 ES6 语法转化成为 ES5 语法再执行 
    * `require` 是赋值过程，require 的结果就是 `module.exports` 后面的内容，例如对象、函数、字符串、数组等，最终把 require 的结果赋值给某个变量。





