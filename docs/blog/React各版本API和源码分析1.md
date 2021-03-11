# React各版本API和源码分析1


## React 16.3.0
1. 
2. 
3. 
4. 

## React.creatElement 分析
* `https://www.babeljs.cn/repl` 分析 React
* `key`: 标志唯一性
* `ref`: 引用到整个子元素, 改变子元素的属性和方法
1. createElement
2. ReactElement

3. 
```javascript
import React from 'react';
import ReactDom from 'react-dom';


function App(){
	return (
    	<div className="div-class" className="div-class">
        	<span className="span-class">
        		ssssssss
        	</span>
        	<p className="p-class">
        		pppppppp
        	</p>
      	</div>
    )
}

ReactDom.render(<App/>, document.getElementById('root'),()=>{
	// 处理 render 之后的逻辑，只会执行一次
})

```

4. 
```javascript
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "div-class",
    className: "div-class"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "span-class"
  }, "ssssssss"), /*#__PURE__*/_react.default.createElement("p", {
    className: "p-class"
  }, "pppppppp"));
}

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(App, null), document.getElementById('root'), () => {// 处理 render 之后的逻辑，只会执行一次
});
```






## React.children.map 分析
```javascript
// react 处理数组

// 第一种
[1,2,3].map(item => {
    return <div key={item}>{item}</div>
})

// 第二种(适用于后端传过来的数据)
React.Children.map([1,2,3], (item) => {
    return <div key={item}>{item}</div>
})
```


## React fiber 大致思路
1. 为什么要用 fiber 调度, 它解决了什么问题
    * react16 以前的调度算法, 采用自顶向下递归, 更新整个子树, 这个过程不能打断, 不能取消。如果子树特别大的情况, 主线程会一直被占用。会造成 页面掉帧, 出现卡顿现象。
    * react16 推出 fiber 调度, 分为2个阶段:
        * 一个是 reconciliation 阶段
            * fiber 在执行过程中以 fiber为基本单位
            * 每执行完一个 fiber, 都会有一个询问是否有优先级更高的任务一个判断
            * 如果有优先级更高的任务进来, 就中断当前执, 先执行优先级更高的任务。
            * 这个阶段会进行 diff, 生成 workInProgressTree, 并且标记好所有的 `side effect`
                * 数组结构变成链表结构
                * 任务+过期时间/优先级
                * reconciliation 可以被打断, 不能渲染到页面上的
                * commit 阶段，是渲染到页面上的，一次性执行完
        * 一个是 commit 阶段
            * 处理所有的 side effect, 执行更新操作。
            * 此阶段不可中断

## ReactDom.render 分析 
1. 用法
    ```javascript
    ReactDOM.render(<App />, document.getElementById('root'), (instance) => {})
    ```
2. Root
    ```javascript
    Root: {
        _reactRootContainer: RootType
    }
    ```

3. ReactRoot
    ```javascript
    RootType: {
        _internalRoot: FiberRoot
    }
    ```

4. FiberRoot
    ```javascript
    // 一个 ReactDom.render() 就只会有一个FiberRoot
    FiberRoot: {
        // 当前应用对应的 Fiber 对象
        currernt: uninitalizedFilber, FiberNode
        // root 节点
        containerInfo: containerInfo,
        // 指向当前已经完成准备工作的 Fiber Tree Root, 在 commit 阶段处理
        finishedWork: null, // Fiber 链表解构
        // 过期时间
        expirationTime: NoWork,
    }
    ```

5. FiberNode
    ```javascript
    //FiberNode
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    // Function | String | Symbol | Number | Object
    this.type = null;
    this.stateNode = null;

    // Fiber 表示父级 FiberNode
    this.return = null;
    // 表示第一个子 FiberNode
    this.child = null;
    // 表示紧紧相邻的下一个兄弟 FiberNode
    this.sibling = null;

    this.index = 0;
    // 拿到真实的 DOM 实例
    this.ref = null;
    // 表示新的 props
    this.pendingProps = pendingProps;
    // 当前 fiber 的旧 props
    this.memoizedProps = null;
    // 更新队列, 队列内放着即将要发生的变更状态
    this.updateQueue = null;  // 最终会遍历这个 update 链表
    // 表示经过所有流程处理后的当前的 state
    this.memoizedState = null;
    this.contextDependencies = null;

    this.mode = mmode;

    // effectTag 更新类型, 例如: replace delete update
    this.effectTag = NoEffect;
    // 下一个将要处理的副作用
    this.nextEffect = null;
    // 第一个需要处理的副作用
    this.firstEffect = null;
    // 最后一个将要处理的副作用
    this.lastEffect = null;
    // 过期时间是和优先级有关
    this.expirationTime = NoWork;
    // 子 fiber 中优先级最高的 fiber
    this.childExpirationTime = NoWork;
    // 连接上一个状态的 fiber, 储存之前的镜像
    this.alternate = null; // 上一次更新时的旧 Fiber = WorkInProgress.alternate;
    ```

## 面试常见问题

## Hook 源码分析















