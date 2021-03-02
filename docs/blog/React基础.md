# React基础


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




