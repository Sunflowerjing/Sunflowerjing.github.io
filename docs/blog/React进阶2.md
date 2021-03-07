# React进阶2

## React Hook 

1. 什么是 React Hook ?
    * 16.8 新增的特性
    * 在函数组件中, 使用 state
    * hook 钩子, 类似于 class 生命周期回调函数
    * 使我们在非 class 的情况下, 可以使用更多的 react 特性
    * 完全可选的
    * 100%向后兼容
    * 现在已经可用
    * 没有计划从 react 中移出 class
    * 不影响对 react 概念理解
    * props state context

2. 为什么要用 Hook ?
    * 代码更加简洁
    * 上手简单
        * React 上手不容易, 主要是?
            * 生命周期难以理解, 很难熟练运用
            * Redux 状态管理, 概念非常多, 难以理解
            * 高阶组件理解起来不容易, 必须掌握。似懂非懂
            * 优秀的解决方案, 都在 React 社区
        * Hook学习成本降低
            * 生命周期可以不用学
            * 高阶组件不用学
            * redux 也不在是必需品, mobx 上手容易 
    * 开发体验非常好
        * 可以让函数组件维护内部的状态

3. 回顾 React
    * 单项数据流
        * 和 Vue 双向数据绑定不同, React 是自上而下单向数据流
        * 数据只能从 父组件 传入子组件
        * Root App => props => container => props => component
        * state/props 改变会引起组件重新渲染(父组件变化 => 下面的所有子组件重新渲染)
        * `重新渲染`
            * class render
            * function 整个函数重新执行
    * 函数组件
        * 首字母大写
        ```javascript
        function Component() {
            // 返回 JSX 结构
            return <div></div>
        }
        ```
        * 在 JSX 中通过首字母大小写, 来区分`普通标签`还是`自定义组件`
    * hook 函数式组件
        * 16.8后 有状态的函数式组件 state => userState
4. Hook 的核心概念与应用
    * `useState`
        * 每次渲染, 函数都会重新执行
        * 函数执行完毕, 所有的内存都会释放掉。 userState
        * 在函数内部创建一个当前函数组件的状态, 提供了一个修改状态的方法
        * 其实在函数中对变量进行保存, 可以通过闭包来实现
        * count: 默认状态值为10; setCount: 修改状态的函数
            * `useState(10) => [count, setCount]`
        * 基本案例
            ```javascript
            import React,{useState} from 'react';
            
            function HookComponent(){
                let [count, setCount] = useState(0);
                function handleAdd(){
                    count++;
                    // setCount 主要是来修改count
                    // setCount 接收的值, 可以是任意类型, state 的改变都是异步的
                    setCount(count);
                }
                return (
                    <div>
                        我是 hook 组件, state 值 --- {count}
                        <button onClick={handleAdd}>点击加1</button>
                    </div>
                )
            }

            export default HookComponent;
            ```
        * 注意事项
            ```javascript
            // 设置对象类型
            // 初始化操作, 首次渲染的时候才会执行
            // 首次执行 count{a:1}
            // 再次执行 获取到的就不是初始值, 闭包中的缓存值
            let [count, setCount] = useState({a:1 })
            // 连接
            setCount({...count, b:2})
            // 页面使用
            {coun.b} --- {coun.a}
            ```
        * 开发中用到的案例
            ```javascript
            import React,{useState} from 'react';
            
            function HookComponent(){
                const number = 2;
                // 初始值可以进行逻辑运算. useState 可以接收任意类型
                let [count, setCount] = useState(() => {
                    return 10 * number
                });
                // useState 允许使用多次
                let [num, setNum] = useState(100);
                function handleAdd(){
                    // setCount 主要是来修改count
                    // setCount 接收的值, 可以是任意类型, state 的改变都是异步的
                    setCount(() => {
                        // 可以传入回调函数进行逻辑运算
                        return ++count;
                    });
                    console.log(num, setNum);
                }
                return (
                    <div>
                        我是 hook 组件, state 值 --- {count}
                        <button onClick={handleAdd}>点击加1</button>
                    </div>
                )
            }

            export default HookComponent;
            ```
    * `useEffect`
        * 函数总会执行`副作用操作`
            * 只想渲染 一个DOM, 但是 DOM 渲染完了, 还会执行一段逻辑(副作用)
            * ajax 访问原生DOM对象 定时器
            * 没有发生在`数据向视图转换过程中的逻辑`
            * 分为 需要清除的 和 不需要清除的
                * 如何清除副作用?
                    * 生命周期函数中用: componentWillUnmount
                    * Hook: 通过`返回一个清除副作用的函数`。组件卸载前执行, 多次渲染就有，多个useEffect的话, 就在下一个useEffect 之前, 清除上一个useEffect的内容
                    * 案例: 模拟清除副作用函数
                    ```javascript
                    useEffect(() => {
                        // ajax
                        setTimeout(() => {
                            setCount(count => {
                                return ++count
                            });
                        }, 1500);
                        console.log('我是副作用函数');
                        // 1. 组件卸载前
                        // 2. 下一个 effect 前
                        function clear(){
                            // 清理工作
                            console.log('我是清除函数');
                        }
                        return clear;
                    }, [refresh]) 
                    ```
            * Hook 之前, 副作用都是不被允许的
        * 函数组件, 纯函数, props, 固定的输入总会得到固定的输出
        * `useEffect` 专门操作副作用的函数
            * 类似: componentDidMound componentDidUpdate 相同的用途, 合并到此 API 中
            * 接收函数 `useEffect(fn)` 组件渲染到屏幕之后才会执行, 返回清除副作用函数, 否则不返回内容
            * `useEffect(fn)` 不会阻塞浏览器渲染。不同步使用 `useEffect(fn)` 
            * 同步执行使用 `useLayoutEffect(fn)`
        * 案例
            ```javascript
            import React,{useState,useEffect} from 'react';

            let [count, setCount] = useState(() => {
                    return 10 * number
                });

            function HookComponent(){
                // 执行时机: DOM 渲染完成之后, 才会自动执行
                useEffect(() => {
                    // ajax 请求, 可以放在这里
                    setTimeout(() => {
                        setCount(count => {
                            return ++count
                        });
                    }, 1500)
                // 第二个参数: 数组, 传入依赖值. 如果 依赖值 改变才会执行useEffect, 否则不执行. 浅比较
                // 如果定了第二个参数, 告诉 react 不依赖与 props, state 更改。
                }, [])
            }
            
            // 1. DOM 渲染完成, 副作用执行useEffect
            // 2. 副作用执行过程中, 修改了 count, state 状态被修改。
            // 3. state改变 => 引发重新渲染. 
            // 4. 无限循环
            ```
        * `含有第二个参数`, 依赖值。依赖值改变才会执行useEffect函数
            * 使用场景: 点击按钮,去请求接口
            * 案例
            ```javascript
            import React,{useState,useEffect} from 'react';
            const [refresh, setRefrsh] = useState(100)
            let [count, setCount] = useState(() => {
                    return 10 * number
                });
            useEffect(() => {
                setTimeout(() => {
                    setCount(count => {
                        return ++count
                    });
                }, 1500)
            }, [refresh])            

            <button onClick={() => setRefrsh(!refresh)}> 请求 </button>
            ```
        * 
        * 
        * 
        * 
        * 
    * `useContext`
        * 16 更新了 context api
            * 定义了发布者模式, 在爷孙组件中进行传值
        * 使用 context 能力
        * context 和 useContext 使用, 可以解决组件之间的状态共享问题。之前用 redux 解决
        * 可以实现两个互不相关的组件, 信息的传递
            * 提供一个`顶层组件` ContextProvider.js
                ```javascript
                import React, {createContext, useState} from "react";
                // 创建 context 对象
                export const context = createContext({});
                export function ContextProvider(children){
                    const [count, setCount] = useState(10);

                    const countVal = {
                        count,
                        setCount,
                        add: () => setCount(count+1),
                        reducer: () => setCount(count-1)
                    }   
                    // context 对象中, 提供了一个自带的 Provider 组件。 别的组件中 可以使用 useContext 来订阅context对象
                    return <context.Provider value={countVal}>{children}</context.Provider>
                }
                ```
            * 定义子组件 SubCount.js
                ```javascript
                import React, {useContext} from "react";
                import {context, ContextProvider} from "./ContextProvider";

                function SubCount(){
                    const {count =0, add, reducer} = useContext(context);
                    return (
                        <div>
                            <h1>我是SubCount组件</h1>
                            <p>{count}</p>
                            <button onClick={add}>加<button>
                            <button onClick={reducer}>减<button>
                        </div>
                    )
                }

                export default () => (
                    <ContextProvider>
                        <SubCount />
                    </ContextProvider>
                )
                ```
            * 定义子组件 HookComponent.js
                ```javascript
                import React, {useContext} from "react";
                import SubCount from "./SubCount";

                function handleAdd() {
                    // 调用 SubCount
                    return (
                        <div>
                            <SubCount />
                        </div>
                    )
                }
                ```
            * 定义 2 个 顶级组件, 想在一个子组件中用
                ```javascript
                import {context, ContextProvider} from "./ContextProvider";
                import {context2, ContextProvider2} from "./ContextProvider2";

                export default () => (
                    <ContextProvider2>
                        <ContextProvider>
                            <SubCount />
                        </ContextProvider>
                    </ContextProvider2>
                )
                ```
    * `useReducer`
        * redux 几乎完全相同
        * useState 内部就是靠 `useReducer` 实现的
        * 是 useState 的替代方案 
        * 接收 (state, action) => newState
        * useReducer 适合下一个 state 依赖 上一个 state, 简单的用 `useReducer`, 复杂的用 `useReducer`
        * 接收3个参数, 返回当前的 state, 配套的 dispatch 
        * 案例: `ReducerComponent.js`
            ```javascript
            import React, {useReducer} from "react";

            // (state, action) => newState 和 redux 完全相同

            // useReducer 接受三个参数

            // 定义了一个简单的 reducer。第一个参数
            // 第一个参数 当前的状态值, 第二个参数 告诉 reducer 当前执行什么操作
            const reducer = (state, action) => {
                // react 有一个action对象, 且必须 type 属性, 才称作是 action
                // action 主要用来描述发生了什么, 即发送动作指令。让 reducer 去做
                switch(action.type){
                    case "add": 
                       return {...state, count: state.count+1};
                    case "reduce": 
                       return {...state, count: state.count-1}; 
                    default:
                       return state;  
                }
            }

            // 定义 第二个参数。 createStore() 定义管理数据的仓库, 指定默认值
            let initialState = {
                count:10;
                name:'reducer'
            }

            // 定义 第三个参数, 是一个函数。 会把第二个参数initialState, 当做参数执行
            // 即 参数 相当于上面的 initialState 
            const init = initialState => {
                // 进行一些初始值的逻辑操作
                return {count: initialState.count + 2}
            }

            // redux三大核心: `Store`、`Recucer`、`Action` 

            export default function ReducerComponent(){
                const [state, dispatch] = useReducer(reducer, initialState, init);
                return (
                    <div>
                        
                        <p>{state.count}</p>
                        // redux 中 , 流程是通过 dispatch 触发 action(上面定义的 add 和 reduce )
                        <button onClick={() => dispatch({type: 'add'})}>加</button>
                        <button onClick={() => dispatch({type: 'reduce'})}>减</button>
                    </div>
                )
            }

            ```
            * 分析上面代码的执行过程 如下图
            ![React Hook ](redux执行流程.png)
    * useRef
        * 
        * 
        * 
        * 
        * 
    * useMomo & useCallback
        * 
        * 
        * 
        * 
        * 
    * 自定义 Hook
        * 
        * 
        * 
        * 
        * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 


5. Hook 使用规则
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 




