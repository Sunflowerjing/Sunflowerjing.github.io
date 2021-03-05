# React进阶1




## react 生命周期
1. 概念
    * 存在: `类组件`存在生命周期函数
    * 生命周期: 从创建 到 销毁 的一个过程


2. 挂载阶段
    * `constructor(props)`
        * 接收父组件 super(props)
        * 初始化操作: this 绑定, state
    * `componentWillMount`
        * 组件即将挂载, render 之前调用
        * `只会调用一次`。 有可能调用 2 次, 在 `SSR 项目`中, 服务端调用一次, 客户端调用一次 
        * 很少使用
        * 调用 setState 不会引起重新渲染
        * 使用同步的 setState , 不会触发额外的 render 处理
        * 16.3 版本, 标记过时生命周期。`UNSAFE_componentWillMount()`
        * 产生副作用, 或者订阅
    * `render`
        * 唯一必要方法
        * 根据 state、props 返回一个 react 元素, 描述组件 UI
        * 不负责组件的实际渲染工作, 只是返回一个 UI 的描述, 返回 JSX 元素
        * 注意:
            * 必须是一个纯函数, 在这里不能改变 state setState, 不能执行任何有副作用的操作
        * 作用
            * 计算 props/state 返回对应的结果
            * 用 React.createElement() 将 JSX 转换为 Virtual DOM 对象模型 
    * `componentDidlMount`
        * 组件挂载到 DOM 后触发, 只会调用一次.
        * 因为获取到 DOM 结构了, 依赖 DOM 节点操作, 就可以放到该方法中了。
        * 能够获取到真实的 DOM, `setState 引起组件重新渲染`
        * 向服务端请求数据 
            * 可以保证获取到数据时, 组件已经处于挂载阶段。直接操作 DOM, 初始化第三方库。
            * 保证在任何情况下，只会调用一次, 不会发送多余的数据请求。
        * 只能在浏览器端请求数据
            * 服务端不可能产生 DOM 
        * 作用
            * 数据可以获取到, 真实的 DOM 也可以获取到
            * 可以进行数据请求, 进行数据修改
            * 操作真实的 DOM, 第三方库实例化

3. 更新阶段
    * `UNSAFE_componentWillReceiveProps(nextProps)`
        * 组件将要接收 props
        * props 引起的组件更新过程中, 会触发此生命周期函数
        * this.setState 即 state 改变, 不会触发此函数. 但是可以调用 setState
        * 只要父组件的 render 函数被调用, 无论父组件传递给子组件的 props 有没有改变, 都会触发。
        * 挂载阶段触发 props, 不会触发此函数
        * 官方建议用 `static getDerivedStateFromProps(props, state)` 此方法替代
            * 会在调用 `render` 方法之前调用
            * 并且在`初始挂载`及后续更新时都会被调用
            * 它应`返回一个对象来更新 state`，如果返回 null 则不更新任何内容。
    * `shouldComponentUpdate(nextProps, nextState) false` 比较重要
        * 通知 react 组件是否更新, 有权利阻止更新
        * react 默认状态改变, 组件重新渲染
        * 尽量遵循默认行为, 状态改变, 组件就会被重新渲染
        * 要求必须有返回结果
        * 决定视图是否渲染, true 渲染视图, false 视图不渲染。必须要有这个返回值
            ```javascript
            // 判断 下次更新值和这次更新值相等, 则不进行渲染。
            // 例如: 父组件渲染，子组件值没有改变。则不进行子组件渲染
            if(nextProps.props属性名 !== this.props.属性名 || nextState.state属性名 !== this.state.属性名){
                return true;
            } else {
                return false;
            }
            ```
        *  减少组件不必要的渲染, 提高性能
        * 不能调用 setState
    * `UNSAFE_componentWillUpdate(nextProps, nextState)`
        * 更新发生前, 一般很少用
        * 不能调用 setState
    * `componentDidlMount(prevProps, prevState)`
        * 更新完成调用
        * 接收2个参数, 之前的属性 和 之前的状态
        * 有机会来操作 DOM
        * 判断是否发送网络请求 (做好条件比较)
        * 适合发送网络请求
        * 无论父组件 props 改变还是 state 的修改, 都会触发该方法。

4. 卸载阶段
    * `componentWillUnmount`
        * 在组件被卸载并销毁之前立即被调用。在此方法中执行必要的清理。
        * 做一些清理工作
        * 定时器, 取消网络请求, 移出事件监听

5. 错误处理阶段
    * `componentDidCatch(error, info)`
        * 错误的捕获

6. 版本变化
    * 15 版本
        * 存在: 挂载阶段, 更新阶段, 卸载阶段
    * 16 版本
         * 添加 错误处理阶段











