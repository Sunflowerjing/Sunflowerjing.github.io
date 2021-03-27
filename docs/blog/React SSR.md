# React SSR



## 客户端渲染
1. 什么是客户端渲染
    * 页面的文字，在源代码中找不到, 存在 JS 中。
    * React/vue: 页面是 JS 渲染出来的, JS 存在客户端, 所以是客户端渲染
2. 客户端渲染的优缺点
    * 优: 可见即可操作。页面操作流程自然。
    * 缺: 首次加载白屏时间长。SEO 不友好。


## 服务端渲染
1. 什么是服务端渲染
    * 页面的文字，在源代码中可以找到, 不需要 JS 渲染。服务器直接渲染好了返回客户端
2. 服务端渲染的优缺点
    * 优: SEO 友好。首屏加载快
    * 缺: 页面体验不好。可见不一定可操作。服务器压力过大。


## react 同构
1. 什么是 react 同构

2. react 同构的优缺点
    * 优: SEO 友好。首屏加载快。页面切换自然
    * 缺: 配置复杂。服务器压力大。部分开发受限

3. 基于 koa + react + ts 实战



## SSR实现步骤
1. 使用 koa 渲染一段最基本的服务器端渲染
    - 渲染一段 HTML
    - 在 html 中引入一个 script 表示执行客户端打包的文件
2. 打包客户端文件
    - 新建客户端的入口文件
    - 新建 shared 下的 App.tsx 用来同构
    - 配置 webpack 打包客户端的文件，打包生成 build.js
        - 配置文件扩展名: `extensions: ['.tsx','.ts','.js','.json']`
    - 配置 babel-loader
        - @babel/core
        - @babel/preset-react
        - @babel/preset-typescript
        - @babel/preset-proposal-class-properties(可选)
    - 配置 npm run build:client 打包客户端
3. 配置一个静态资源服务器 
    - 使用 koa-static
    - 配置到 public 文件夹
4. 配置 server 端的打包
    - 类似于客户端的 webpack 配置
    - 注意 target
    - webpack-node-externals 避免打包 nodejs api
    - 配置 npm run build:server 打包服务端
    - 配置 npm-run-all --parallel build:* 批量打包客户端和服务端
    - 配置 npm run server: `cd dist && nodemon ./app.js`

执行 npm run build 之后， 执行 npm run server, 即可看到页面内容

5. 真正的服务端渲染
    - 在 server 端，引入 react-dom/server 下的 `renderToString`
    - 渲染完成之后，放入 id=root 的 div 内容，实现服务器端渲染
    - 客户端改写 render 为 hydrate, 消除警告


6. 前后端路由绑定
    - 仿照 react-router 官网, 在 App.tsx 创建一个基本的路由
    - 安装 react-router-dom
    - 直接运行会报错, 因为服务器端是没有 dom 的, 需要进行路由拆分
    - 拆分前端路由 browRouter, 后端路由 staticRouter, 并且分别绑定

请求数据之前，需要对路由进行 JS 配置

    - 使用 react-router-confing 改写路由，使用 renderRoutes 渲染路由
    - 在 app.tst 中, 使用 renderRoutes去渲染路由


7. 数据请求
    - 安装 `@koa/router` 将之前的中间件改成对应的路由
    - 在服务器端新增一个 getData 接口
    - 客户端使用 axios 在 componentDidMount 中请求接口

7.1 如何不使用 ajax, 让服务器直接将数据绑定好??

查看 react-router 官网，可以看到 server render 的方法

    - 在定义的js 对象路由上，新增一个 loadData 方法，用来提供数据加载
    - 在对应的组件上，实现 loadData 方法，去请求数据，并返回 Promise
    - 后端使用 marchRoutes 匹配到对应的路由，然后判断是否有 loadData
    - 后端执行请求后即可获得数据，然后将数据渲染到 window 对象上
    - 前端 componentDidMount 里面获取数据


7.2 现在的问题是，如果一个路由匹配多个页面，那么如何进行多级路由

需要借助 redux

- 安装 redux react-redux
- 新建一个  store/index.ts
- 定义 reducer, initStore, 并调用 createStore 创建 store
- 客户端和服务器分别提供 createClinetStore/createServerStore
- 在两端分别绑定 provider 传入 store 即可
- 在组件中通过 mapStateToProps 获取 store 中的数据进行渲染

8. 改写后端数据请求
    - 在调用组件的 loadData 方法时，将 store 传入
    - 在 loadData 执行完成后去触发 store.dispatch 去修改组件
    - 在 window 中注入的对象改为 store.getState() 就可以了
    - 在客户端 createClinetStore 中需要引入 store 是默认项为
    - 


9. 最后一个问题，路由切换的时候数据怎么获取
    - 编写数据为空判断，如果是路由切换，使用 ajax 渲染即可
    - ajax 请求到数据之后，调用 mapDispatch 方法改一下 store 即可重新



## 补充 SSR 关键点
- 客户端搭建
  - React ReactRouter Recoil
- 服务端搭建
  - koa 相关插件
- SSR 处理
  - 路由处理
  - 请求处理

开始具体的代码编写
1. 创建目录 
```js
yarn init -y

react-ssr
  build
  src
    client
    server
```
2. 安装依赖
    * @types 就是ts用到的一些依赖，如果没有还需要自己定义 d.ts
        ```js
        yarn add react @types/react react-dom @types/react-dom
        ```
3. 编写组件
    * 新建 client/pages/App.jsx 根组件
        ````js
        import React from 'react';
        const App = () => {
            return <h1>Hello React</h1>
        }
        export default App;
        ````
    * 新建 client/index.jsx 入口文件 
        ```js
        import React from 'react';
        import ReactDom from 'react-dom';
        import App from "./pages/App";

        // reactDom有个render方法可以把我们的组件渲染到页面上
        ReactDom.render(<App></App>,document.getElementById('root'));
        ```  
    * 创建 About 页面
        - about.jsx
        - about.css
        ```js
        import React from "react";
        import "./about.css";
        const About = () => {
            return (
                <div className='about'>
                <h2>About</h2>
                </div>
            );
        };
        export default About;
        ```
        ```js
        .about {
            color: red;
        }
        ```
    * 创建 home 页面
        - home.css
        - home.jsx
        ```js
        import React from "react";
        import "./home.css";
        const Home = () => {
            return (
                <div className='home'>
                <h2>Home</h2>
                </div>
            );
        };
        export default Home;
        ```
        ```js
        .home {
            color: blue;
        }
        ```
4. 配置路由
    - 安装依赖
        ````js
        yarn add react-router-dom
        ````
    - 新建 client/router/index.js  编写路由代码
        - 看下官网的例子 https://reactrouter.com/ 
        - react router  现在已经是5.x 了，和之前的路由还是有区别的，之前的像vue一样的配置，可以进行集中式配置，现在的路由都是组件式的
            ```js
            import React from "react";
            import { Route, Switch } from "react-router-dom";
            import Home from "../pages/About/about";
            import About from "../pages/Home/home";

            // 这里导出，一会我们在服务端会用到
            export const routes = [
                {
                    path: "/",
                    exact: true,
                    component: Home,
                },
                {
                    path: "/about",
                    exact: true,
                    component: About,
                },
            ];

            // 注意返回 是括号，大扩号要加return
            export const Routes = () => (
                <Switch>
                    {routes.map((r, index) => {
                        const { path, exact, component } = r;
                        return (
                            <Route key={index} path={path} exact={exact} component={component} />
                        );
                    })}
                    {/* 如果前边的路由都不匹配，会匹配最后一个路由，一般这里是一个404页面组件 */}
                    {/* <Route component={NotFount} /> */}
                </Switch>
            )
            ```
    - 把页面组件引入到根组件  App.jsx
        ```js
        import React from "react";
        import { Routes } from "../router/index";
        import { BrowserRouter as Router } from "react-router-dom";
        // 注意放到大扩号执行
        const App = () => <Router basename='/'>{Routes()}</Router>;
        export default App;
        ```
    












5. 配置webpack
    - 安装依赖
        ```js
        yarn add webpack webpack-cli webpack-dev-server -D
        ```
    - 新建 build/webpack.base.js
        ```js
        const {resolve} = require('path');

        module.exports = {
            // 打包到哪
            output:{
                // 打包到哪，打包到根目录下的dist目录下就行了
                path:join(__dirname,'../dist'),
            },
        module:{
            rules:[
            {
                // 这里还是babel-loader ，只不过解析的插件不一样
                test:/\.ts(x)$/,
                use:['babel-loader']
            }
            ]
        }
        // 配置下扩展名，默认只识别js,这里的jsx不会识别加上
        resolve:{
            // js 一定要配置上，要不这里会把默认的覆盖
            extensions: ['.ts', '.jsx', '.js','.json']
            }
        }
        ```  
6. 配置下ts解析
    - 解析 react  语法需要用到的 @babel/preset-react 这个在babel官方都有对应说明
    -  https://www.babeljs.cn/docs/babel-preset-react  
        ```js
        // 安装babel依赖
        yarn add  babel-loader @babel/core @babel/preset-react -D
        ```
    - 安装完配置下 .babelrc
        - 还有个css解析要配置，还是一样的，客户端处理，服务端不处理
        ```js
        {
            "presets": ["@babel/preset-react"]
        }
        ```
7. 新建 build/webpack.client.dev.js
    ```js
    const {
        resolve
    } = require('path');

    const {
        merge
    } = require('webpack-merge');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const baseConfig = require('./webapck.base');

    const devConfig = {
        mode: "development",
        entry: resolve(__dirname, "../src/client/entry.client.jsx"),
        output: {
            filename: "client.bundle.js"
        },
        devServer: {
            contentBase: resolve(__dirname, "../dist"),
            port: 8080,
            // hashrouter  histroy  后端
            historyApiFallback: true,
        },
        module: {
            rules: [{
                test: /\.css$/,
                // 注意下顺序，从右往左
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: resolve(__dirname, "../src/client/index.template.html")
            })
        ]

    }
    module.exports = merge(baseConfig, devConfig);
    ```
8. 新建 client/index.template.html
    ```js
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>react ssr</title>
    </head>

    <body>
        <div id="app"></div>
    </body>

    </html>
    ```
9. 需要的依赖安装一下
    ```js
    yarn add -D webpack-merge html-webpack-plugin mini-css-extract-plugin css-loader
    ```
10. 配置打包命令
    ```js
    "scripts": {
        "client:server": "webpack serve --config ./build/webpack.client.dev.js",
        "client:dev": "webpack --config ./build/webpack.client.dev.js",
        "server:dev": "webpack --config ./build/webpack.server.dev.js",
        "dev:build": "yarn client:dev && yarn server:dev",
        "dev:server": "nodemon ./src/server/app.js"
    },
    ```
11. 启动起来 
    ```js
    yarn client:server
    ```
    - home.jsx
        ```js
        import { NavLink} from "react-router-dom";
        <h2>Home</h2>
        <NavLink to='/about'>about页面</NavLink>
        ```
    - about.jsx
        ```js
        import { NavLink} from "react-router-dom";
        <h2>About</h2>
        <NavLink to='/'>home页面</NavLink>
        ```
12. 搭建服务端
13. 安装依赖    
    ```js
    yarn add koa @koa/router koa-static 
    ```
14. 编写服务端代码
    - app.js
    ```js
    import Koa from "koa";
    import serve from "koa-static";
    import {resolve} from 'path';
    const app = new Koa();
    initRoute(app);
    app.use(serve(resolve(__dirname, '../../dist')));
    app.listen(3000, () => {
        console.log("server is running at http://localhost:3000");
    });
    ```
    - router/index.js
    ```js
    import Router from "@koa/router";
    const router = new Router();
    export const route = (app)=>{
    router.get(['/','/about'],async (ctx,next)=>{
            ctx.body = '服务端启动成功';
    })
    app.use(router.routes()).use(router.allowedMethods());
    }
    ```
    - 配置下命令让他跑起来
    ```js
    // 先安装下依赖
    // 这里需要用到babel-cli 
    yarn add nodemon 

    // 命令
    "dev:server": "nodemon  .src/server/app.js"
    ```
    - 启动 `yarn dev:server`
        - 服务端也启动起来了，那我们继续往下，是不是要在服务端渲染 客户端组件，然后由服务端直接将html返回回来
    - entry.server.js
        ```js
        import React from "react";
        import { Routes } from "./router/index";
        import { StaticRouter as Router } from "react-router-dom";
        // 导出服务端要调用的一方法
        // ctx 是服务端调用的时候传进来的，我们可以拿到一些地址等信息，可以匹配路由
        export default (ctx) => {
            // 返回一个Promise
            return new Promise( (resolve) => {
                resolve(
                // 这里我们需要拿到请求的地址赋值给他，也是官方文档说明的
                <Router location={ctx.req.url}>{Routes()}</Router>
                );
            });
        };
        ```
    - Router/index.js
        ```js
        const Router = require('@koa/router');
        const router = new Router();
        const serverBundle = require('../../../dist/server.bundle.js').default;
        const {
            renderToString
        } = require("react-dom/server");
        module.exports = (app) => {
            router.get(['/', '/about'], async (ctx, next) => {
                const jsx = await serverBundle(ctx);
                const html = renderToString(jsx);
                ctx.body = html;
            })
            app.use(router.routes()).use(router.allowedMethods());
        }
        ```
    - 现在渲染完成了，但是现在刷新页面，每次都请求服务端，因为js没有加载进来
        - 我们把页面模板和js，css引入进来
    - router/index.js
        ```js
        const fs = require("fs");
        const {
            resolve
        } = require('path');

        const fileResolve = (file) => path.resolve(__dirname, file);
        const template = fs.readFileSync(resolve(__dirname, '../../../dist/index.html'), "utf8");
        const {
            renderToString
        } = require("react-dom/server");

        function templating(template) {
            return (props) =>
                template.replace(
                    `<div id="app"></div>`,
                    `<div id="app">${props.html}</div>`
                );
        }
        router.get(['/', '/about'], async (ctx, next) => {
                const render = templating(template);
                const jsx = await serverBundle(ctx);
                const html = renderToString(jsx);
                const body = render({
                    html
                });
                ctx.body = body;
            })
        ```
    - 现在再来访问，就是ssr了，
    - 首屏服务端直出，再切换页面就是js控制页面的渲染了
15. SSR 处理
16. 请求处理
    - 服务端添加一个接口
        ```js
        router.get('/api/getUserInfo', (ctx) => {
            ctx.body = {
                code: 0,
                message: "",
                data: {
                    name: 'yd'
                },
            };
        })
        ```
    - About/about.jsx
        ```js
        import axios from 'axios';
        import React, { useEffect, useState } from "react";
        import "./about.css";
        import { NavLink } from "react-router-dom";
        import axios from "axios";
        const About = () => {
        const [userInfo, setUserInfo] = useState({ name: "" });
        useEffect(() => {
            axios.get("http://localhost:3000/api/getUserInfo").then((res) => {
            console.log(res.data.data);
            setUserInfo(res.data.data);
            });
        }, []);
        return (
            <div className='about'>
            <h2>About</h2>
            <h3>名字{userInfo.name}</h3>
            <NavLink to='/'>home页面</NavLink>
            </div>
        );
        };
        export default About;

        ```
    - 现在来访问，数据正常请求回来了
    - 这里先来梳理下一个请求的流程。
    - 我们先通过服务器渲染，把我们页面的html给他渲染出来，然后我们再使用ajax去拿到后端的数据，并且显示在页面上。
17.  大家在这个流程中有没有发现一个问题?
    - 既然我们已经通过服务器端渲染了，为什么还通过ajax去请求服务器端的数据，
    - 其实页面的数据，在服务器端渲染的时候就可以一并拿回来。
    - 所以接下来来修改下代码。
    - 其实在react-router中已经给出了一个解决方案: https://reactrouter.com/web/guides/server-rendering
    - 看下他是引导我们怎么去做的，看到dataloading 部分
        ```js
        loadData: () => getSomeData()
        ```
    - 在组件上添加了一个 获取数据的方法
    - router/index.js
        ```js
            {
                path:'/about',
                component:About,
                exact:true,
                // about 下要发请求，这里就涉及到一个方法，我们要把请求的这个方法放到哪个位置呢？
                // 一般是挂载到组件上，
                loadData:getUserInfo
            }
        ```
    - about.jsx
        ```js
        export const getUserInfo = () => {
            return axios.get("http://localhost:3000/api/getUserInfo")
        };
        ```
    - Router/index.jsx
        ```js
        import About, { getUserInfo } from "../pages/About/about";
        ```
    - Server-entry.jsx
        ```js
        import { matchPath } from "react-router-dom";
        // 这里是之前写好的路由 routes，导出来可以遍历匹配
        import { Routes,routes } from "./router/index";

        // 写一下
        export default (ctx) => {
            // 返回一个Promise
        return new Promise((resolve) => {
            routes.some((route) => {
            console.log(route.path, ctx.request.path);
            if (route.path === ctx.request.path) {
                // 打印看下
                console.log(route);
            }
        });
        ```
    - Server-entry.jsx
        ```js
        // 定义一个异步请求数组，有可能有多个数据请求

        export default (ctx) => {
            // 返回一个Promise
            return new Promise((resolve) => {
                const promises = [];
                routes.some((route) => {
                // matchPath 就是匹配前端的路由
                // 并且存在异步请求
                if (route.path === ctx.request.path && route.loadData) {
                    promises.push(route.loadData());
                }
                });
                // 这里要把之前的html代码放到这里边，要等到所有的请求结束，再去渲染页面
                Promise.all(promises).then((data) => {
                    // promise.all 返回的是一个数组
                    console.log("data", data[0].data.data);
                    resolve(
                        // 这里我们需要拿到请求的地址赋值给他，也是官方文档说明的
                        <Router location={ctx.req.url}>{Routes()}</Router>
                    );
                });
            });
        };
        ```
18. 注水脱水
    - 通过 redux作为中间者来处理下，和vue就是一个思路了

    - 如果不借助中间者，我们直接往页面里放，也不知道它的一个具体位置，通过redux这样一个的一个全局状态管理就可以轻松处理了。

    - 这也是vue为什么使用了vuex。

    - 安装redux
        ````js
        yarn add redux
        ````
        - redux 首先需要新建一个store  shred/store
        - store 它又分为很多，比如index action reducer，一些actiontype 等等，
        - 这里为了方便，我们就简单一点，  
    - 新建 store/index.jsx
        ```js
        import {createStore} from 'redux';
        // store有个默认的状态，初始值也就是
        const initState = {
            name:'chushi'
        }
        // reducer 传进来的就是一个action
        function reducer(state = initState,action){
            switch(action.type){
                // 这里的CHANGE_DATA一般应该存放在专门存放常量的一个文件里的，这里就直接写了，
                case 'CHANGE_DATA':
                    return {
                        // 如果要修改data的话，我就把当前的state返回，并且把action中传的payload 合并
                        ...state,
                        ...action.payload
                    }
                default:
                    return {...state} //默认是一个浅拷贝
            }
        }
        // 然后分别把它交给我们的客户端和服务器端
        export function createClientStore(){
            // createStore 接收的第一个方法是reducer,所以需要写一个reducer方法
            return createStore(reducer);
        }
        export function createServerStore(){
            // createStore 接收的第一个方法是reducer,所以需要写一个reducer方法
            return createStore(reducer);
        }
        // 这里分为服务器端，客户端，是因为在不同的端要进行各自的处理，客户端还需要接收服务端注入好的初始值
        ```
    - entry.client.jsx
        ```js
        import {Provider} from 'react-redux';
        import {createClientStore} from './store/index';

        ReactDom.render(<Provider store={createClientStore()}><App /></Provider>, document.getElementById("app"));
        ```
    - Entry.server.js
        ```js
        import { Provider } from "react-redux";
        // 引入服务端的 createServerStore
        import { createServerStore } from "./store/index";

        <Provider store={createClientStore()}>
                <Router location={ctx.req.url}>{Routes()}</Router>
        </Provider>
        ```
    - 注入之后，现在想要在about中去引入，又得用react-redux里边的connect来将我们的组件进行一个包裹，来拿到store中的值
    - 然后将store中的值映射到Props上
    - 这里也就不需要之前定义的state了
        ```js
        import { useSelector } from "react-redux";

        const name = useSelector((state) => {
            console.log(state);
            return state.name;
        });

        // 把之前的删除了
        ```
    - 开始注水脱水操作
        - 这里需要处理的一个地方就是，我们处理的页面模板是在 router/index.js ,

        - sotore 是在entry.sever.js 

        - 怎么把entry.server.js 的store传到 roetuer/index.js 可以使用呢？

        - 这里可以利用 ctx上下文，作为中间者，进行传递

        - 来操作下
            ```js
            // 改下这几个地方
            return new Promise((resolve) => {
                const promises = [];
                const store = createServerStore();
            
            Promise.all(promises).then((data) => {
                // 数据请求完再挂载
            <Provider store={store}>
            ```

















