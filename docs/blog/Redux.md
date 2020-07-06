# Redux
* 安装 redux(状态管理):  `npm install redux`
* 创建一个 React Redux 应用程序: `npx create-react-app my-app --template redux`


## store: state状态管理器
1. 创建一个 `Redux store` 来存放应用中所有的 `state`。
2. 整个应用中`有且仅有一个 store`。
3. 创建方式:
``` javascript
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
export default store

// 上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
```
4. 可以理解为，store 是 state 和 view 链接的桥梁。(毕竟创建 store 的元素包含 reducer, 构成 reducer 的有 state)


## State
1. 应用中所有的 `state` 都以一个 `对象树的形式`储存在一个`单一的 store` 中。
2. 操作state
    > 1. `state 的变化`要通过 `store对象的 dispatch() 方法`来实现。(传递一个 action 对象给 reducer处理)
    > 2. 必须要通过 store API 操作 state, react 中的 view 才会更新.
    ```javascript
    store.dispatch(action)
    ```
3. 获取state: `store.getState()`
4. `根据 action 的信息`来`改变 state 树`，需要`编写 reducers`。


## reducer
* 作用: `根据 action 对象的type 来更新状态`
* 工作方式: 
    > 1. 接收一个 state 参数, 作为初始的 state
    > 2. 接收一个action对象, 在函数体中用 switch 语句 判断 action 的type, 然后定义相应的处理方式( 返回新的 state 对象)。
* reducer 函数示例:
    > 1. 在示例中, 根据 `action.type 属性`来执行`对应的 switch 语句`
    > 2. redux 要求, `reducer 每次返回的对象(state)必须是新的对象`.
    > 3. 所以我们可以在函数体中创建新对象, 或者是通过 Object.assign({}, ...sources)的方法来实现.
```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) { 
      case "ADD": 
        return Object.assign({}, state, { 
            count: state.count + action.num 
        }); 

      case "REDUCE": 
        return Object.assign({}, state, { 
            count: state.count - action.num 
         }); 

      default: 
         return state;
    }
};
```
* `state 保存数据`。`reducer定义处理数据的规则`。`action触发某种规则`


## Action
1. 一个`具有 type 属性的哈希对象`, 作为 reducer 函数中 switch 语句的开关。
2. 创建一个 action: 
```javascript
// create actions
const ADD_ACTION = "ADD";
const REDUCE_ACTION = "REDUCE";

const add = num => {
  return {
    type: ADD_ACTION,
    num
  };
};

const reduce = num => {
  return {
    type: REDUCE_ACTION,
      num
  };
}; 
```

## redux 工作流程
1. 首先`声明 action` 对象。需要声明 `type 属性`。
2. 定义 `reducer 函数`。
3. 创建 `store 对象`。`let store = createStore(reducer)`。调用 store 对象API


## action, Reducer, store 之间的关系
1. action 是一个哈希对象.
2. reducer 中定义如何根据 action 来操作 state.
3. store 接收 reducer 作为参数
   * 通过 store 的 api 来接收 action 以调用 reducer
   * ```store.dispatch(action)```


## 示例代码
```javascript
import React from "react";
import ReactDOM from "react-dom";
import Redux, {createStore} from "redux";

// create actions
const ADD_ACTION = "ADD";
const REDUCE_ACTION = "REDUCE";

const add = num => {
  return {
    type: ADD_ACTION,
    num
  };
};

const reduce = num => {
  return {
    type: REDUCE_ACTION,
    num
  };
};

// initialize a state
const initialState = {
  count: 0
};

// create a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return Object.assign({}, state, {
        count: state.count + action.num
      });

    case "REDUCE":
      return Object.assign({}, state, {
        count: state.count - action.num
      });

    default:
      return state;
  }
};

function getCurrentState() {
  return reduxStore.getState();
}

function addState() {
  reduxStore.dispatch(add(1));
  console.log(getCurrentState());
}

function reduceState() {
  reduxStore.dispatch(reduce(1));
  console.log(getCurrentState());
}

const reduxStore = createStore(reducer);
console.log(reduxStore.getState());

class App extends React.Component {
  constructor(props) {
    super(props);
    //初始化 state
    this.state = getCurrentState();
  }

  render() {
    return (
      <div>
        <h1>A Redux Example, open console to check results.</h1>
        <button onClick={addState}>add</button>
        <button onClick={reduceState}>reduce</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
```


## redux 中间件(middleware)
1. 主要用于`处理异步数据流`;
2. `redux中间件`的实质是对`store`的`dispatch`进行重写和包装，修改`store.dispatch`的默认行为;
3. redux中间件是对`redux功能的一种扩展`，也是`扩展dispatch`的唯一标准方式;
4. 特点: `可以链式调用`
5. 对于`链式调用`，`后一个中间件的修改`是`基于前一个中间件修改的基础`上进行的;
6. 中间件函数的形式描述为: `({ getState, dispatch }) => next => action`


## applyMiddleware
