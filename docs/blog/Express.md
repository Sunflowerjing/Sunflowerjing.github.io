# Express

* `restful`: 同样的一个请求, 即可以用 post 方式, 也可以用 get 方式。路由可以并排的往后写/:id/:name/:age。


## Express 框架核心特性
* 可以设置中间件来响应 HTTP 请求。
* 定义了路由表用于执行不同的 HTTP 请求动作。
* 可以通过向模板传递参数来动态渲染 HTML 页面。


## Express 的使用
* 安装 Express 并将其保存到依赖列表中: `npm install express --save`
* `安装 supervisor`: 热启动。`使用: supervisor app.js`
* 详细讲解:
    1. 安装并且引用 Express, 启动 Express 的实例。
    2. app.listen 一个端口, 启动一个后台服务。
    3. app.get 设置一个基础的路由, 然后吐出数据。
    4. 平时的请求都是 get, 即在浏览器上访问
    5. get、post、put、delete。$.ajax->put


## Express请求和响应
* Express 应用使用回调函数的参数: `request` 和 `response` 对象来处理`请求`和`响应`的数据。
```
var express = require('express');
var app = express();
app.get('/', function (req, res) {
   // --
})
```
* request 和 response 对象的具体介绍:
    * Request 对象 - `request` 对象表示 `HTTP 请求`，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有:
        1. `req.query`: 获取URL的查询参数串。
        2. `req.params`: 获取路由的parameters。`路由: /index/:id。 访问: req.params.id`
    * Response 对象 - `response` 对象表示 `HTTP 响应`，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有:
        1. `res.cookie(name，value [，option])`: 设置Cookie。
        2. `res.json()`: 传送JSON响应。
        3. `res.jsonp()`: 传送JSONP响应。
        4. `res.send()`: 传送HTTP响应。
        5. `res.render(view,[locals],callback)`: 渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。


## Express 中间件
* 举例: next(); 向下传递中间件。
```
var express = require('express');
var app = express();
app.get('/index', function (req, res, next) {
   req.data = 123;
   next();
}, function(req, res, next) {
    console.log('通过中间件取到的值', req.data);
    res.send('end');
})
```
* Express 和 Koa 中间件的区别:
    * 例如: 
    ```
    aaa
    xxx next();
    bbb

    ccc
    xxx next();
    ddd
    ```
    * Express: 向下走。   `上面的执行结果: aaa -> bbb -> ccc -> ddd`
    * Koa: 停住。   `上面的执行结果: aaa -> ccc -> bbb -> ddd`
* 使用中间件
    * 应用层中间件
    ```
    var app = express()

    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    })
    ```
    * 路由器级中间件
    ```
    var app = express();
    var router = express.Router();

    router.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    })
    router.use('/user/:id', function (req, res, next) {
        console.log('Request URL:', req.originalUrl)
        next()
    }, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
    ```
    * 错误处理中间件
    ```
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    })
    ```
    * 内置中间件
    * 第三方中间件
    ```
    下载: npm install cookie-parser

    var express = require('express')
    var app = express()
    var cookieParser = require('cookie-parser')

    // load the cookie-parsing middleware
    app.use(cookieParser())
    ```

## Express 路由
* `controller/action`: 一个 controller 对应多个 action。
* `app.all()`: 用于为所有 HTTP请求方法的路径加载中间件功能。例如，无论是使用`GET，POST，PUT，DELETE`还是`http模块`支持的任何其他`HTTP请求方法`，都会对路由`/secret`的请求执行以下处理程序。
```
app.all('/secret', function (req, res, next) {
    // req: 接收用户的请求
    // res: 响应用户的数据
    console.log('Accessing the secret section ...')
    next() // 将当前的请求, 交给下一个句柄。(句柄: 有可能是很多条语句, 对应的回调函数)
})
```
* `路线处理程序`: 路由处理程序可以采用函数，函数数组或二者组合的形式。
    * 单个回调函数可以处理路由。
    ```
    app.get('/example/a', function (req, res) {
        res.send('Hello from A!')
    })  
    ```
    * 多个回调函数可以处理一条路由（确保指定了next对象）。例如:
    ```
    app.get('/example/b', function (req, res, next) {
        console.log('the response will be sent by the next function ...')
        next()
    }, function (req, res) {
        res.send('Hello from B!');
    })
    ```
    * 回调函数数组可以处理路由。例如:
    ```
    var cb0 = function (req, res, next) {
        console.log('CB0')
        next()
    }

    var cb1 = function (req, res, next) {
        console.log('CB1')
        next()
    }

    var cb2 = function (req, res) {
        res.send('Hello from C!')
    }

    app.get('/example/c', [cb0, cb1, cb2])
    ```
    * 独立功能和功能数组的组合可以处理路由。例如:
    ```
    var cb0 = function (req, res, next) {
        console.log('CB0')
        next()
    }

    var cb1 = function (req, res, next) {
        console.log('CB1')
        next()
    }

    app.get('/example/d', [cb0, cb1], function (req, res, next) {
        console.log('the response will be sent by the next function ...');
        next();
    }, function (req, res) {
        res.send('Hello from D!');
    })
    ```
    * `应对方法`: res下表中响应对象（）上的方法可以向`客户端发送响应，并终止请求-响应周期`。如果从路由处理程序中`未调用这些方法`，则`客户端请求将被挂起`。

    |  方法                  | 描述 |
    |  ----                 | ----  |
    | res.download()        |	提示要下载的文件。 |
    | 重发（）                |	结束响应过程。|
    | res.json（）            |	发送JSON响应。|
    | res.jsonp（）           |	发送带有JSONP支持的JSON响应。|
    | res.redirect（）      |	重定向请求。|
    | res.render（）        |	渲染视图模板。|
    | res.send（）          |	发送各种类型的响应。|
    | res.sendFile（）      |	将文件作为八位字节流发送。|
    | res.sendStatus（）    |	设置响应状态代码，并将其字符串表示形式发送为响应正文。|















