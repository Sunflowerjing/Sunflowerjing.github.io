# Koa

* 读源码好处:
    * 加深 koa 理解
    * 提高阅读源码能力, 从而提高编码技能




##  应用（Application）
1. 简单 Demo
    ```javascript
    const Koa = require("koa"); // package.json 里面的 "main": "lib/application.js"
    const app = new Koa();

    app.use((ctx) => {
        ctx.body = '你好 静静';
    })

    app.listen(3000);
    ```
2. 解析
    * Application 继承 Emitter: `class Application extends Emitter `
        * `Emitter`: 事件发送机制的一个库
        * `const Emitter = require('events');`
    * `constructor()`
        * 初始化父类 `super()`
        * 初始化变量(app. 都能获取到):
            * 代理 - `proxy`
            * 中间件 - `middleware`
            * `subdomainOffset`
            * 环境变量 - `env`. 等价于: process.env.NODE_ENV(node 底层)
            * `Object.create()` 克隆.
                * 目的: 在一个项目中 new 多个 Koa。多个 Koa 不会冲突。
                * `Object.create(context);`
                * `Object.create(request);`
                * `Object.create(response);`
    * `listen()` 
        ```javascript
        listen(...args) {
            debug('listen');
            const server = http.createServer(this.callback());
            return server.listen(...args);
        }
        ```
        * http: 引入 `require('http')`封装了`createServer`。调用`listen`, 传入端口号。
    * `toJSON()` 
        ```javascript
        toJSON() {
            return only(this, [
            'subdomainOffset',
            'proxy',
            'env'
            ]);
        }
        ```
        * only: 引入 `require('only');`
        ```javascript
        module.exports = function(obj, keys){
            obj = obj || {};
            if ('string' == typeof keys) keys = keys.split(/ +/);
            return keys.reduce(function(ret, key){
                if (null == obj[key]) return ret;
                ret[key] = obj[key];
                return ret;
            }, {});
        };
        ```
    




## 上下文（Context）



## 请求（Request）


## 响应（Response）
































