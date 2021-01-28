# Express和Koa的比较

* 发展历史
  * Express.js
  * Koa.js
  * Egg.js是基于Koa.js的一个封装

## 使用express.js启动一个简单的服务器，基本写法:
```javascript
const express = require('express')

const app = express()
const router = express.Router()

app.use(async (req, res, next) => {
  console.log('I am the first middleware')
  next()
  console.log('first middleware end calling')
})
app.use((req, res, next) => {
  console.log('I am the second middleware')
  next()
  console.log('second middleware end calling')
})

router.get('/api/test1', async(req, res, next) => {
  console.log('I am the router middleware => /api/test1')
  res.status(200).send('hello')
})

router.get('/api/testerror', (req, res, next) => {
  console.log('I am the router middleware => /api/testerror')
  throw new Error('I am error.')
})

app.use('/', router)

app.use(async(err, req, res, next) => {
  if (err) {
    console.log('last middleware catch error', err)
    res.status(500).send('server Error')
    return
  }
  console.log('I am the last middleware')
  next()
  console.log('last middleware end calling')
})

app.listen(3000)
console.log('server listening at port 3000')
```

## 等价的 koa2，基本写法:
```javascript
const koa = require('koa')
const Router = require('koa-router')

const app = new koa()
const router = Router()

app.use(async(ctx, next) => {
  console.log('I am the first middleware')
  await next()
  console.log('first middleware end calling')
})

app.use(async (ctx, next) => {
  console.log('I am the second middleware')
  await next()
  console.log('second middleware end calling')
})

router.get('/api/test1', async(ctx, next) => {
  console.log('I am the router middleware => /api/test1')
  ctx.body = 'hello'
})

router.get('/api/testerror', async(ctx, next) => {
  throw new Error('I am error.')
})

app.use(router.routes())

app.listen(3000)
console.log('server listening at port 3000')
```

## 二者的使用区别比较:

|           | koa(Router = require('koa-router'))   | express(假设不使用app.get之类的方法)  |
| ---- | ---- | ---- |
| 初始化 | const app = new koa() | const app = express() |
| 实例化路由 | const router = Router()	 | const router = express.Router() |
| app级别的中间件	 | app.use	 | app.use |
| 路由级别的中间件	 | router.get	 | router.get |
| 路由中间件挂载	 | app.use(router.routes())	 |  app.use('/', router)  |
| 监听端口	 | app.listen(3000)	 | app.listen(3000) |



