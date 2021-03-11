# React基础1


## 概念
1. 用于`构建用户界面`的 JavaScript 库。
2. `特点`
    * `虚拟 DOM`:  DOM diff
    * `组件化`: 创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI
    * `声明式`: 面向数据编程。数据改变时 React 能有效地更新并正确地渲染组件.
    * `灵活`: 可以和库与框架更好的配合。
    * `高效`: 因为虚拟 DOM, 减少了 DOM 操作。
    * `面向对象`: 封装组件的内部资源，数据整体流动。
3. `React VS Vue`
    * React 相对于 Vue 来说, React 的`灵活性和协作性`更好一些
    * Vue 有着丰富的 Api, 实现起来简单快速
    * Vue 上手成本, 学习成本相对低
    * 大型复杂项目还是比较推荐 Vue

## 创建基本 react 项目
1. 安装 node
2. 安装 npm 包
3. 安装 cli 脚手架: 
    ```javascript
    npx create-react-app my-app
    cd my-app
    npm start
    ```
4. 最好自己搭建脚手架: 使用 webpack
5. `yarn.lock`: 中版本号前面的 ^, 表示版本的锁定。 只允许安装版本号大的。


## 项目结构
1. 基本目录结构
    ```javascript
    config // webpack 配置文件
    node_modules // 
    public // 公共文件
    src // 源码文件
        - assetc // 静态资源
        - components // 公共组件
        - tests // 测试文件
        - app.js // 根组件 可写函数组件或类组件
        - index.js // 项目的入口文件, 引入 app.js 文件
        import React from 'react';
        // 提供 DOM 操作的功能库, 将虚拟 DOM 转换成真实 DOM
        import ReactDOM from 'react-dom';
        // 渲染 DOM, 将 APP 组件 挂载到root节点上
        ReactDOM.render(<APP/>, document.getElementById("root"))
    package.json
    README.md
    ```
2. 函数组件 - 无状态
    ```javascript
    function App(){
        return (
            <div className="App">
                <h2>hello word</h2>
            </div>
        )
    }
    ```
3. 类组件
    ```javascript
    class App extends React.Component {
        return (
            <div className="App">
                <h2>hello word</h2>
            </div>
        )
    }
    ```








## JSX
1. 什么是 JSX
    * 一切 JS。all in JS
    * 全称: `javascript and xml`
    * 可拓展的标记性语言
    * 说明: JSX 是 react 中一项技术, 不是全新的语言, JS 扩展
    * JSX 中遇到 `{}` 做为`变量解析`, 遇到 `<` 作为 `HTML 解析`。
2. 基本用法
    * 有些属性, 用`小驼峰`形式. 特例: `dataid`
    * class 在 js 中是保留字, 所以使用 `className`。
    ```javascript
    function App(){
        const divTitle = "我是 APP"
        return (
            <div title={divTitle} className="App">
                <h2>hello word</h2>
            </div>
        )
    }
    ```
3. JSX 原理
    * `Reacr.createElement`
        * 只能有一个`顶层元素`。即`根元素`
        * React 库中提供了`占位符`, `import React, {Fragment} from "react"`.
        * `Fragment` 可以当做根元素使用。 或者 `<></>` 这样写法
    * 页面中的 `DOM 元素`结构, 都是可以使用 `javascript 对象`来描述。
    * 上面的 JSX 语法, 编译成下面的代码。虚拟 DOM
    ```javascript
    // JSX 语法通过 Babel 编译之后, 就是通过下面的形式插入的 Chrome 中的
    function App(){
        const divTitle = "我是 APP"
        // ------ 下面代码 和 上面 return 中的代码 是一样的
        const element = Reacr.createElement(
            "div", // div 标签。必填
            {title: divTitle}, // 属性
            // 子节点
            Reacr.createElement(
                "h2",
                null,
                "hello word"
            )
        )
        // -----
        return element;
    }
    ```

4. JSX具体用法
    * 标签类型
        * DOM 标签。例如: `div p`。首字母必须`小写`
        * 自定义标签。 例如: `组件`。首字母必须`大写`
    * 内联样式
        ```javascript
        function App(){
            const divTitle = "我是 APP";
            const divStyle = {
                color: "red",
                fontSize: '26px'
            }
            // style={divStyle} 或者 style={{color: "red"}} 第一个大括号 JSX 解析
            return (
                <div style={divStyle} title={divTitle} className="App">
                    <h2>hello word</h2>
                </div>
            )
        }
        ```
    * 表达式: `{true ? 1 : 2}`
    * 标签属性: 驼峰命名
        * `onClick`
        * `className`
    * 注释: `{/* 我是注释 */}`
    * 扩展运算符, 属性展开: `...`
        ```javascript
        // 定义 User 组件
        function User(props){
            return (
                <div>
                    <h2>我是 user</h2>
                    <p>{props.name} --- {props.age}</p>
                </div>
            );
        }   

        // 调用 User 组件, 并且传递参数
        const props = {name:'张三', age:10}
        <User {...props}>
        ```
        








