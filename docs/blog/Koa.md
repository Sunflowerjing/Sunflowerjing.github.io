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
    * 检查元素, 其实就是调用的是`toJSON()`
        ```javascript
        inspect() {
            return this.toJSON();
        }
        ```
    * `use()`
        ```javascript
        use(fn) {
            if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
            if (isGeneratorFunction(fn)) {
            deprecate('Support for generators will be removed in v3. ' +
                        'See the documentation for examples of how to convert old middleware ' +
                        'https://github.com/koajs/koa/blob/master/docs/migration.md');
            fn = convert(fn);
            }
            debug('use %s', fn._name || fn.name || '-');
            this.middleware.push(fn);
            return this;
        }
        ```
        * 判断 `fn` 是一个函数, 若不是函数就报错。提示`中间件是一个函数`
        * `isGeneratorFunction`是引用的一个库，用作代码的转化用的。支持迭代器
        * `debug` 使用: `DEBUG=koa * node --harmony app.js`
        * 如果函数不需要处理，则 `push 到 middleware` 中。
    * `callback()`
        ```javascript
        callback() {
            const fn = compose(this.middleware);

            if (!this.listenerCount('error')) this.on('error', this.onerror);

            const handleRequest = (req, res) => {
                const ctx = this.createContext(req, res); // http 协议里面的范畴
                return this.handleRequest(ctx, fn); // http 协议里面的范畴
            };

            return handleRequest;
        }
        ```
        * `listenerCount` 继承 `Emitter`
        * 如果调用方式为: `app.on('error', (err) => { console.log('err', err) })`。 则会输出 err
        * `handleRequest` : 例如 `handle 开头`的，都是`事件处理函数`。
    * `createContext()`
        ```javascript
        createContext(req, res) {
            const context = Object.create(this.context);
            const request = context.request = Object.create(this.request);
            const response = context.response = Object.create(this.response);

            context.app = request.app = response.app = this;
            context.req = request.req = response.req = req;
            context.res = request.res = response.res = res;

            request.ctx = response.ctx = context;
            request.response = response;

            response.request = request;

            context.originalUrl = request.originalUrl = req.url;
            context.state = {};
            return context;
        }
        ```
        * 创建上下文: `Object.create(this.context)`
        * 数据来回交换。`request 中有 response, response 中有 request。`
    * `handleRequest()`
        ```javascript
        handleRequest(ctx, fnMiddleware) {
            const res = ctx.res;
            res.statusCode = 404;
            const onerror = err => ctx.onerror(err);
            const handleResponse = () => respond(ctx);
            onFinished(res, onerror);
            return fnMiddleware(ctx).then(handleResponse).catch(onerror);
        }
        ```
        * 使用方式
        ```javascript
        app.use(async (ctx, next) => {
            ctx.body = '你好 静静';
            await next();
            .......
        })

        // ctx => handleRequest 中第一个参数, fnMiddleware => handleRequest 中第二个参数fnMiddleware
        ```
    * `onerror()`
        ```javascript
        onerror(err) {
            // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
            // See https://github.com/koajs/koa/issues/1466
            // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
            const isNativeError =
            Object.prototype.toString.call(err) === '[object Error]' ||
            err instanceof Error;
            if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err));

            if (404 === err.status || err.expose) return;
            if (this.silent) return;

            const msg = err.stack || err.toString();
            console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
        }
        ```
        * 以上的判断, 都不存在的时, 才会去拿`堆栈`信息。console 出来。
    * `respond()`
        ```javascript
        function respond(ctx) {
            // allow bypassing koa
            if (false === ctx.respond) return;

            if (!ctx.writable) return;

            const res = ctx.res;
            let body = ctx.body;
            const code = ctx.status;

            // ignore body
            if (statuses.empty[code]) { // 读取状态码, 如果状态码为空, 则清调 body。返回结束。
                // strip headers
                ctx.body = null;
                return res.end();
            }

            if ('HEAD' === ctx.method) {
                if (!res.headersSent && !ctx.response.has('Content-Length')) {
                    const { length } = ctx.response;
                    if (Number.isInteger(length)) ctx.length = length;
                }
                return res.end();
            }

            // status body
            if (null == body) {
                if (ctx.response._explicitNullBody) {
                    ctx.response.remove('Content-Type');
                    ctx.response.remove('Transfer-Encoding');
                    return res.end();
                }
                if (ctx.req.httpVersionMajor >= 2) { // 判断 httpVersionMajor 是2.0 还是 1.0
                    body = String(code);
                } else {
                    body = ctx.message || String(code);
                }
                if (!res.headersSent) {
                    ctx.type = 'text';
                    ctx.length = Buffer.byteLength(body);
                }
                return res.end(body); // 发送 body
            }

            // responses
            if (Buffer.isBuffer(body)) return res.end(body);
            if ('string' === typeof body) return res.end(body);
            if (body instanceof Stream) return body.pipe(res);

            // body: json
            body = JSON.stringify(body);
            if (!res.headersSent) {
                ctx.length = Buffer.byteLength(body);
            }
            res.end(body); // 最终调用 http的 response 发送数据
        }
        ```
        * 回应信息, `ctx.respond = false` 绕过 koa中 内置的 `respond`。
        * `handleResponse` 中, 会调用 `respond()`








## 上下文（Context）
1. 其实就是: `ctx`
2. 解析: 
    * `ctx.inspect()`: 其实就是调用的 `this.toJSON()`
    * 每一个文件中 都有 `inspect()` 和 `toJSON()`方法, 并且 `inspect()` 调的都是 `toJSON()`。主要是简单的序列化。
    * `assert: httpAssert`: 引用的是 `require('http-assert');` 此库断言。
    * `throw()`
        ```javascript
        throw(...args) {
            throw createError(...args);
        }

        // 引用的是此库: require('http-errors');
        ```
        * 调用方式
        ```javascript
        ctx.throw(400, '出错了', {
            user: {
                name: '静静'
            }
        })
        ```
    * `onerror()`
    * `get cookies()`
        ```javascript
        get cookies() {
            if (!this[COOKIES]) {
            this[COOKIES] = new Cookies(this.req, this.res, {
                keys: this.app.keys,
                secure: this.request.secure
            });
            }
            return this[COOKIES];
        }
        ```
        * 引入的第三方库: `const Cookies = require('cookies');`
        * 
    * `set cookies()`  
        ```javascript
        set cookies(_cookies) {
            this[COOKIES] = _cookies;
        }  
       ```     
    * `delegate()`
        ```javascript
        delegate(proto, 'response')
            .method('attachment')
            .method('redirect')
            .method('remove')
            .method('vary')
            .method('has')
            .method('set')
            .method('append')
            .method('flushHeaders')
            .access('status')
            .access('message')
            .access('body')
            .access('length')
            .access('type')
            .access('lastModified')
            .access('etag')
            .getter('headerSent')
            .getter('writable');
        ```
        * 引用的库 `require('delegates')`
            ```javascript
            Delegator.prototype.method = function(name){
                var proto = this.proto;
                var target = this.target;
                this.methods.push(name);

                proto[name] = function(){ // 挂载到原型上了
                    return this[target][name].apply(this[target], arguments);
                };

                return this; // return this 就可以链式调用了
            };
            ```

## 请求（Request）
1. 对 `request` 内容的一些包装
2. 解析
    * `get header()` 
        ```javascript
        get header() {
            return this.req.headers;
        }
        ```
    * `set header(val)`
        ```javascript
        set header(val) {
            this.req.headers = val;
        }
        ```
    * 简单的进行封装, 都是 `get` 和 `set`。
    * `~` 按位非运算符。例如:`!`。两次`~~`，类似与`负负得正`。

## 响应（Response）
1. 同 `request` 一样。也是 get 和 set。
2. 解析
    * `body()`
        ```javascript
        set body(val) {
            const original = this._body;
            this._body = val;

            // no content
            if (null == val) {
            if (!statuses.empty[this.status]) this.status = 204;
            if (val === null) this._explicitNullBody = true;
            this.remove('Content-Type');
            this.remove('Content-Length');
            this.remove('Transfer-Encoding');
            return;
            }

            // set the status
            if (!this._explicitStatus) this.status = 200;

            // set the content-type only if not yet set
            const setType = !this.has('Content-Type');

            // string
            if ('string' === typeof val) {
            if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
            this.length = Buffer.byteLength(val);
            return;
            }

            // buffer
            if (Buffer.isBuffer(val)) {
            if (setType) this.type = 'bin';
            this.length = val.length;
            return;
            }

            // stream
            if (val instanceof Stream) {
            onFinish(this.res, destroy.bind(null, val));
            if (original != val) {
                val.once('error', err => this.ctx.onerror(err));
                // overwriting
                if (null != original) this.remove('Content-Length');
            }

            if (setType) this.type = 'bin';
            return;
            }

            // json
            this.remove('Content-Length');
            this.type = 'json';
        }
        ```
        * 对 body 的4种类型处理: `string`和 `buffer`、`stream`、`json`。
    * `redirect()`
        ```javascript
        redirect(url, alt) {
            // location
            if ('back' === url) url = this.ctx.get('Referrer') || alt || '/';
            this.set('Location', encodeUrl(url));

            // status
            if (!statuses.redirect[this.status]) this.status = 302;

            // html
            if (this.ctx.accepts('html')) {
            url = escape(url);
            this.type = 'text/html; charset=utf-8';
            this.body = `Redirecting to <a href="${url}">${url}</a>.`;
            return;
            }

            // text
            this.type = 'text/plain; charset=utf-8';
            this.body = `Redirecting to ${url}.`;
        }
        ```
        * 重定向, 根据条件判断, 符合条件的状态码设置为302。
    * `type()`
        ```javascript
        get type() {
            const type = this.get('Content-Type');
            if (!type) return '';
            return type.split(';', 1)[0]; // 取第一个
        }
        ```






























