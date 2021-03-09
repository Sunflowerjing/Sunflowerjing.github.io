# Redux2

## 什么是 Redux
1. `props`: 上级分发下来的属性, 一级一级
2. `state`: 组件内部状态管理
3. `react`: 单向数据流
    * 数据状态非常复杂 -> 很难让两个组件进行通信
    * 解决: `把所有的state集中到组件的顶部 -> redux`
    * 集中管理组件的状态, `数据仓库`
    * redux: JS 状态容器, 提供可预测化的状态管理
    * react 和 redux 是没有任何关系。`redux 就是一个独立的状态管理库`
    * mobx 状态管理库
4. redux 工作过程
    * 工作过程: `store` => 保存 `state tree(状态树)` => 改变 `state` 的唯一方法 => `store.dispatch` 触发一个 `action` => 通知 `reducer` 完成 state 更新。
    * 组件可以`派发 dispatch action(动作行为)`, 派发给 `store`。
    * 其他组件可以`订阅 store 中的状态 state`, 来刷新自己的视图
    * 要点: 应用中所有的 `state` 都以一个`对象树`的形式存储在一个单一的 `store` 中, 唯一`改变 state` 的方式是`派发 action`。
        * `action`: 一个描述发生了什么的对象, 是一个动作或行为。
        * `reducer`: 为了描述 action 如何改变 state 树

## Redux 的好处
1. props, 单向数据流, 一级一级向下传递
2. Redux 解决的问题
    * 多级传递数据的痛苦
    * 相邻组件(兄弟组件) 的数据传递 -> parent 顶层组件, `connect 函数` 进行react和redux的连接
3. Redux 可以将数据连接到任何组件
    * connect 函数

## Redux 的使用场景
1. 公共组件、业务组件非常多, 用户使用方式比较复杂, 项目庞大
2. 不同用户角色权限管理
3. 需要与服务器大量交互, 聊天直播等应用
4. view 需要从多个来源获取数据
5. react 解决不了的, 多交互, 多数据源, 使用 redux
6. 注: 不要盲目引入 redux, 只会增加项目的复杂度。评估

## Redux是如何工作的
1. 看图示例
2. Redux `三大核心`
    * `action`: 描述发生什么的一个对象, 是一个`动作`或者`指令`。
        * 必须有一个 type 参数, `{type: 'add'}`。 type参数用来定义`动作指令`
        * 项目庞大之后: 使用单独的模块或文件来存放 `action`
        * action 通过 `dispatch` 派发指令
    * `reducer`: 具体描述
        * 接收 `action.type` 指令, 执行具体做什么.
        * 返回一个 `newState`
        * 数据控制器, `数据的修改者`。在 reducer 中对state数据的一个修改。
        * 指定应用状态(state) 变化如何响应action, 并发送到 store
        * 描述应用更新过程是在 reducer 发生的
        * 注意: 保持 reducer 纯净, `纯函数`, 固定的输入一定有固定的输出。
            * 输入不变, 输出一定也不会变的。
            * 只要传入的参数相同, 返回计算得到的下一个 state 一定相同。
            * 例如副作用操作: Ajax请求, setTimeout() 等
    * `store`: 数据仓库
        * getSate(): 获取 state
        * dispatch(action):  更新 state
        * redux 只有一个单一的store
        * 进行拆分数据处理逻辑 -> 不应该拆分 store, 应该拆分 reducer
            * reducer 提供了 combineReducers函数, 对拆分后的 reducer 进行组合
3. 使用的一般过程
    * 创建 action
    * 创建 reducer
    * 创建 store

## Redux的三大原则
1. 单一数据原则(只允许有一个 store)
    * store => 全局变量对象
2. state 是只读的
    * 唯一改变的方法是触发 action
    * 确保视图 和 api请求都不能直接修改 state, 只能表达想要修改的意图, 通过action来表达修改意图, 在 reducer 中集中化处理
3. reducer 中使用纯函数执行修改
    * 为了描述 action 如何改变state

## 实际应用
* `react 的实现方式`
    1. `ReduxComponent.js`
        ```javascript
        import React from 'react';
        
        class ReduxComponent extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    count: 0
                };
            }
            handleAdd = () => {
                this.setState({
                    count: this.state.count + 1
                })
            }
            handleReduce = () => {
                this.setState({
                    count: this.state.count - 1
                })
            }

            render(){
                return (
                    <div>
                        <h3>我是 counter 组件</h3>
                        <div>
                            <button onClick={this.handleAdd}>加一</button>
                            <span>{this.state.count}</span>
                            <button onClick={this.handleReduce}>减一</button>
                        </div>
                    </div>
                )
            }
            
        }
        export default ReduxComponent;
        ```
    2. `app.js`
        ```javascript
        import React from 'react';
        import ReduxComponent from './components/ReduxComponent';


        function App(){
            return (
                <>
                    <ReduxComponent />
                </>
            )
        }
        ```


* `redux 的实现方式`
    * 安装依赖
        * `yarn add redux react-redux` 
    1. 创建 store and reducer: `/store/index.js`
        ```javascript
        import { createStore } from 'redux';
        // 定义一个初始值
        const initialState = {
            count:0
        }

        // 定义一个 action
        // action 只是强调发生了什么, 并不是做什么。主要是发通知
        // 具体描述 action 如何改变 state 是在 reducer 中专门做处理


        // store 需要一个 reducer
        // (state,action) => newState
        // 唯一要点: 当 state 变化时需要返回一个全新的对象, 不是修改传入的参数, 是覆盖
        // reducer 必须是纯的, 遵守 redux 原则。在reducer中不去请求
        function reducer(state = initialState, action){
            console.log('我是一个reducer', state, action);
            // switch 应用场景比较简单
            // 复杂场景, 创建一个对象通过 action 的 type 来查找对应的处理函数
            switch(action.type){
                case 'ADD' : 
                    // 不能直接修改 state, 必须return返回新的 state
                    // state.count +1  错误实例
                    return {
                        ...state,
                        count: state.count + 1
                    }
                case 'REDUCE' : 
                    return {
                        ...state,
                        count: state.count - 1
                    }
                default state;
            }
        }

        // 创建 store 存放应用状态
        const store = createStore(reducer);

        export default store;
        ```
    2. `ReduxComponent.js`
        ```javascript
        import React from 'react';
        import store from '../store/index.js';
        // 需要 cnnect 函数 provider 组件
        import {Provider} from 'react-redux';
        import ReduxCounter from './ReduxCounter';
        

        class ReduxComponent extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    count: 0
                };
            }
            handleAdd = () => {
                this.setState({
                    count: this.state.count + 1
                })
            }
            handleReduce = () => {
                this.setState({
                    count: this.state.count - 1
                })
            }
            render(){
                return (
                    <div>
                        <h3>我是 counter 组件</h3>
                        <div>
                            <button onClick={this.handleAdd}>加一</button>
                            <span>{this.state.count}</span>
                            <button onClick={this.handleReduce}>减一</button>
                        </div>
                        // 被Provider包裹的, ReduxCounter组件就能拿到 store
                        <Provider store={store}>
                            <ReduxCounter />
                        </Provider>
                    </div>
                )
            }
            
        }
        export default ReduxComponent;
        ```
    3. `ReduxCounter.js`
        ```javascript
        import React from 'react'; 
        import {connect} from 'react-redux';

        // 是一个函数, 用于建立组件 和 store的 state的映射关系
        function mapStateToProps(state){
            return {
                count: state.count
            }
        }

        
        class ReduxCounter extends React.Component {
            handleAdd = () => {
                this.props.dispatch({type: 'ADD'})
            }
            handleReduce = () => {
                this.props.dispatch({type: 'REDUCE'})
            }
        
            render(){
                return (
                    <div>
                        <h3>我是 ReduxCounter 组件</h3>
                        <div>
                            <button onClick={this.handleAdd}>加一</button>
                            <span>{this.props.count}</span>
                            <button onClick={this.handleReduce}>减一</button>
                        </div>
                    </div>
                )
            }
        
        }

        // 实现 redux 到 react 的一个连接
        // 传入 mapStateToProps 这个参数后, 组件便会订阅 store 中状态的变化
        // 两个括号的原因是 connect 是一个高阶函数(高阶组件)
        // connect(mapStateToProps) 调用之后返回一个函数, 返回函数中传入ReduxCounter 组件
        // 前面2步, 执行完毕后返回新的组件, 新的组件就是包装之后的组件
        export default connect(mapStateToProps)(ReduxCounter);
        ```
    
    
    
    
    4. `app.js`
        ```javascript
        import React from 'react';
        import ReduxComponent from './components/ReduxComponent';


        function App(){

            return (
                <>
                    <ReduxComponent />
                </>
            )
        }
        ```







