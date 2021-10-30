# React hook

* 钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。 
* 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。
* Hook 是 React 16.8 的新增特性。它可以在不编写 class 的情况下使用 state 以及其他的 React 特性。


## hook使用规则
* 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
* 只能在 React 的函数组件中调用 Hook。在自定义 Hook 中调用其他 Hook



## useState()：状态钩子
1. 基础案例
```js
import React, { useState } from "react";

export default function  Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");

  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```
2. 分析
    * useState()这个函数`接受状态的初始值，作为参数`，上例的初始值为按钮的文字。
    * 该函数返回一个数组
        * 数组的第一个成员是一个变量（上例是buttonText），指向状态的当前值。
        * 第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是setButtonText）。


## useContext()：共享状态钩子
1. 功能: 组件之间共享状态，可以使用`useContext()`。
2. 基础案例: 两个组件 `Navbar` 和 `Messages`, 我们希望它们之间共享状态。
```js
const AppContext = React.createContext({});

<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
// 上面代码中，AppContext.Provider提供了一个 Context 对象，这个对象可以被子组件共享。



// Navbar 组件的代码如下:
const Navbar = () => {
  const { username } = useContext(AppContext);
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}
// 上面代码中，useContext()钩子函数用来引入 Context 对象，从中获取username属性。


const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
// Message 组件的代码也类似。
```


## useReducer()：action 钩子
1. 基本用法: `const [state, dispatch] = useReducer(reducer, initialState);`
2. 参数说明:
  * 接受参数: `Reducer 函数` 和 `状态的初始值`
  * 返回数组: `状态的当前值` 和 `发送 action 的dispatch函数`
3. 案例:
  ```js
  // Reducer
  const myReducer = (state, action) => {
    switch(action.type)  {
      case('countUp'):
        return  {
          ...state,
          count: state.count + 1
        }
      default:
        return  state;
    }
  }
  // 组件代码
  function App() {
    const [state, dispatch] = useReducer(myReducer, { count:   0 });
    return  (
      <div className="App">
        <button onClick={() => dispatch({ type: 'countUp' })}>
          +1
        </button>
        <p>Count: {state.count}</p>
      </div>
    );
  }
  ```


## useEffect()：副作用钩子
1. `useEffect()` 用来引入具有副作用的操作，最常见的就是向服务器请求数据。
2. 之前，放在`componentDidMount`里面的代码，现在可以放在`useEffect()`。
3. useEffect()的用法如下:
  ```js
  useEffect(()  =>  {
    // Async Action
  }, [dependencies])
  ```
  * useEffect()接受两个参数。
    * 第一个参数: 是一个`函数`，异步操作的代码放在里面。
      * effect 中返回一个函数, 这是 effect 可选的清除机制。
      * 每个 effect 都可以返回一个清除函数。
    * 第二个参数: 是一个`数组`，用于给出 `Effect` 的依赖项，只要这个数组发生变化，useEffect()就会执行。
      * 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
      * 这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。


## 创建自己的 Hooks
1. 案例: usePerson()就是一个自定义的 Hook。
  ```js
  const usePerson = (personId) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        });
    }, [personId]);  
    return [loading, person];
  };
  ```
2. 使用: Person 组件引用这个新的钩子，引入封装的逻辑。
  ```js
  const Person = ({ personId }) => {
    const [loading, person] = usePerson(personId);

    if (loading === true) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <p>Youre viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
    );
  };
  ```
3. 
4. 
5. 
6. 
7. 

 