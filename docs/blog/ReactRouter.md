# ReactRouter


## React Router 介绍
1. 版本: V5 V4 V3 V2
2. `V5/V4`: 用法和理念基本是一致的。 `V3/V2`: 差异比较大 
3. 版本差异
    * V4和V4之前的版本比较
        * V4: 稳定版本, 大多数项目用的V4。V4属于`动态路由`(user/1、user/2)
            * 被拆分成多个包进行发布
            * react-router: 路由基础库
            * react-router-dom: 适用于浏览器环境的再次封装
            * react-router-native: 适用于 react-native 环境的再次封装
            * react-router-config: 静态路由配置助手
            * 主要是按需引用
        * V4之前: 静态路由
    * V5和V4的版本比较
        * V5 新增特性的增加和改进
            * V5 完全兼容 V4 
            * 支持 react16, 兼容react之前的版本
            * 消除了严格模式的警告
            * 适用 create-react-context 实现 context api
    * V5 稳定性与兼容性
    * V5 改进与新特性 
        * >=15 react 版本的完全兼容, react16 提供了更好的支持 
        * 消除了严格模式的警告
        * 引入了预优化 build。 process.env.NODE_ENV
        * 引入包的形式改变
            * 之前: `import Router from 'react-reouter/Router'`
            * 现在: `import {Router, Switch} from 'react-reouter'`
        * 新特性 
            * 之前: 
                ```javascript
                // path: 字符串
                <Route path='user/:id' component={User} >
                <Route path='info/:id' component={Info} >

                // 跳转
                <Link innerRef>
                ```
            * 现在: 
                ```javascript
                // path: 支持数组写法
                <Route path={['user/:id', 'info/:id']} component={User} >

                // 跳转
                <Router component> 使用 React.forwardRef
                ```
            * 目前的 `React Route` 版本中, 已经不需要路由配置, 现在一切皆组件
4. V4 React router 
    * 被拆分成多个包进行发布
    * react-router: 路由基础库
    * react-router-dom: 适用于浏览器环境的再次封装
    * react-router-native: 适用于 react-native 环境的再次封装
    * react-router-config: 静态路由配置助手
    * 主要是按需引用

## 前端路由
1. 原理: 检测浏览器 URL 的变化, 截获URL地址, 然后进行 URL 路由匹配
2. 支持两种模式
    * hash 模式
        * 锚点: `# `
        * `hashchange` 监听 hash 变化
        * 注意; 页面刷新的时候, 浏览器不会向服务器发送请求
        * 案例
            ```javascript
            const btnDom = document.getElementById("btn");
            btnDom.addEventListener("click", () => {
                location.href = "#" + Math.floor(Math.random()*10);
            })
            window.addEventListener("hashchange", e => {
                const {oldURL, newURL} = e;
                console.log('旧url=', oldURL, '新url=', newURL, 'hash值=', location.hash);
            })
            ```
    * html5模式(history 模式)
        * 无 `#`, 是 `/user/name/id` 这种模式
        * 新增方法: `pushState()` 可以改变路由
        * 新增方法: `replaceState()` 可以改变路由
        * 事件: `onpopstate` 监听 不到上面 2个新增方法的改变。
        * 注意: 页面刷新的时候, 浏览器会向服务器发送请求
## 安装
1. V4 和 V5 中, 对 react router 包进行了拆分
2. 主要分为2个方向
    * react web router: `react-router-dom`. web 端
    * react native router: `react-router-native`.  native 端
3. 在项目根目录执行: `npm i react-router-dom`

## 第一个基础路由配置
1. 必不可少的两个组件
    * HashRouter: 对应 hash 模式
    * BrowerRouter: 浏览器路由。对应 html5模式
    * Route: 单个路由, 具体配置

2. 案例
    ```javascript
    // index.js 文件
    import React from 'react';
    // 提供 DOM 操作的功能库
    import ReactDom from 'react-dom';
    // 引入全局样式
    import "./assets/css/index.css" 
    import App from './app';
   
    ReactDom.render(<App/>, document.getElementById('root'))


    // App.js 文件
    import React from 'react';
    import ReactDom from 'react-dom';
    import Home from './Home';
    import About from './About';
    import Info from './Info';
    // BrowerRouter: 此组件是 react-router 的一个核心. 文具盒
    // Route: react-router 的一个具体配, 单个路由. 文具
    import {BrowserRouter, Route, Link} from 'react-router-dom';
    // 根组件 函数组件
    function App(){
        return (
            <BrowserRouter>
                // 路由导航组件
                <div>
                    <Link to="/home"> 跳转到 HOME </Link>
                </div>
                // 如果没有指定 path, 无论访问什么路径, 都会匹配
                <Route component={Info} />
                // 设置严格模式的时候 才会正确显示根路由
                <Route path="/" exact  component={Info} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
            </BrowserRouter>
        )
    }
    export default App;
    ```

3. `Link` 组件
    * 一定要位于`BrowserRouter`中
    * 其实就是链接.
    * 局部刷新
   
## React Router常见概念
1. `Router` 组件
    * 每个 router 都会创建一个 history 对象, 用来保持当前位置的追踪。
    * web 端, 下面的路由都会创建 `history` 对象
        * `HashRouter`: 只处理静态的URL
        * `BrowerRouter`: 非静态的站点，要处理不同的URL
    * react native
        * `MemoryHistory`
2. `Route` 组件
    * 只是一个具有渲染方法的普通 react 组件, 路由匹配成功渲染该组件
    * 常用属性
        * `path`: '' 路由匹配规则。可以省略, 字符串类型
        * `exact`: boolean。设置为 true 则是严格匹配
        * `component`: 要渲染的组件
        * `render`: 函数形式, 直接渲染 JSX。可以进行逻辑操作。path 匹配的时候执行
        * `children`:  函数形式, 直接渲染 JSX。可以进行逻辑操作。任何时候都会执行, 含有match对象, 匹配match则是有对象, 不匹配match则为 null.
        * 执行顺序: `children` > `component` > `render`
        * 案例
            ```javascript
            <Route path="/home" component={Home} />
            // 匹配到才会渲染
            <Route 
                path="/render" 
                render={() => {
                    // 逻辑操作
                    return <h1>我是 render 渲染的</h1>
                }} 
            />
            // 无论是否匹配, 都会渲染
            // 若路由是 /children, 则 match.path 为/children
            // 若路由不是 /children, 则 match 为 null
            <Route 
                path="/children" 
                children={(match) => {
                    // 逻辑操作
                    return <h1>我是 children 渲染的{match?match.path:''+match}</h1>
                }} 
            />
            ```

3. `Switch` 组件
    * 比喻
        * BrowerRouter: 文具盒
        * Switch: 文具盒中的小袋子。最多只能取出一个文具, `最多匹配一个组件`。
        * Route: 小袋子中的笔
    * 作用: 
        * `可以将 Route 组件 进行分组`
        * `可以用作 404 兜底`
    * 案例
        ```javascript
        // 如果第一个匹配到了, 则就不在往下匹配了
        <Switch>
            <Route path="/" exact component={Info} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={about} />
            <Route component={NotFound}} />
        </Switch>
        ```

4. `Link` 与 `NavLink` 组件
    * `Link`: 链接组件. 声明式跳转
        * `to 属性`: string 类型, 对象类型{pathname, search, hash, state} 
        * 案例
            ```javascript
            <Link to="/home"> 跳转到 HOME </Link>
            // 或者
            <Link to={{pathname: "/home", search: "?name=jingjing"}}> 跳转到 HOME </Link>
            ```
        * `replace 属性`: boolean。true 替换当前的历史记录。

    * `NavLink`: 导航组件
        * 特殊版的 Link, 当匹配的时候可以添加样式
        * `activeClassName`
        * `activeStyle`
        * `exact`: 为true时。才会完全匹配样式
        * 案例
            ```javascript
            // 导航的时候可以用到
            <NavLink activeStyle={{color: "red"}} to="/home"> 
                跳转到 about 
            </NavLink>
            ```
   
5. `Redirect` 组件
    * `重定向`组件。
    * 属性
        * `to`属性: 必须的。可以是 字符串或者对象
        * `push`: boolean. 如果是 true, 则将新的地址推入到历史栈中。而不是替换。实际通过 `history.push` 实现
        * `from`: 将要进入的URL
        * `exact`: 完全匹配 from. 严格模式匹配
    * 案例
        ```javascript
        // 模拟登录
        cosnt isLogin = false;
        <Route 
            path="/info"
            render={() => {
                return isLogin ? <Info /> : <Redirect to="login" />
            }}
        >
        ```
6. `History` 对象
    * 每个 router 都会创建一个 history 对象, 用来保持当前位置的追踪
    * 编程式导航: 代码中调用
        * `push`    
            ```javascript
            function Home(props){
                function handlClick(){
                    props.history.push("/abput")
                }

                return (
                    <div>
                        <h1>Home组件</h1>
                        <button onClick={handlClick}>跳转到 about </button>
                    </div>
                )
            }
            ```
7. `withRouter` 组件 
    * 经过路由匹配的组件, 才会有路由参数`history.push()`等
    * 因为 App 根组件没有经过路由匹配, 所以没有history这个对象
        ```javascript
        // 跟组件
        function App(props){
            console.log('app', props.history); // 为 undefind
            return  (
                <>
                    <Link>
                </>
            )
        }
        export default withRouter(App);  // 包裹之后 props.history 就有值了

        ReactDom.render(<BrowerRouter><App/></BrowerRouter>, document.getElementById('root'))
        ```
## 动态路由
1. 路由规则不是预先确定的, 在渲染过程中确定的
    * 例如: `info/1  info/2`
    * 匹配方式: `:id` `props.match.params.id`
        ```javascript
        function About(props){
            return (
                <div>
                    <p>获取到的参数是 {props.match.params.id}</p>
                </div>
            )
        }

        <Route path="/info/:id" component={About} />
        ```
## 嵌套组件
1. 根组件配置的路由为一级路由。
2. 二级路由、子路由.
    * 就是在子组件中, 进行路由配置
    ```javascript
    import React from 'react';
    // 在二级路由中在渲染这两个组件
    import About from './About';
    import Info from './Info';
    import {Route, Link} from 'react-router-dom';

    function Home(props){
        return (
            <div>
                <h1>Home 组件</h1>

                <div>
                    <Link to={`${props.match.path}/one`}>二级路由 - 跳转到About</Link>
                    <Link to={`/home/two`}>二级路由 - 跳转到Info</Link>
                </div>

                <div>
                    <Route path={`${props.match.path}/one`} component={About}></Route>
                    <Route path={`/home/two`} component={Info}></Route>
                </div>
                
            </div>
        )
    }

    <Route path="/info/:id" component={About} /> 
    ```
