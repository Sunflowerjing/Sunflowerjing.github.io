# React基础2


## 虚拟 DOM 和 真实 DOM 

* `删除div/新增div/隐藏div => 虚拟 DOM => 一次映射 => 真实 DOM `

1. 虚拟 DOM
    * 并不是用到浏览器中的 DMO
    * 亮点: 批处理、diff
    * 尽可能少的操作 DOM, 提高渲染效率
    * 案例
    ```javascript
    
    ```
2. 非 DOM 属性以及如何使用
    * `dangerouslySetInnerHTML`:  是 React 为浏览器 DOM 提供 `innerHTML 的替换`方案
        * 案例: 
            `<div dangerouslySetInnerHTML ={{__html: '<p>我是插入的 html</p>'}}></div>`
    * ref 
        * 相当于 原生 HTML 中的 `id`
        * 不能在`函数组件`上使用
        * 可以在函数内部使用
        * 可以访问真实 DOM, 操作 类组件
        * 案例
        ```javascript
        // 创建一个 ref
        const userRef = React.createRef();
        console.log('userRef', userRef.current, '操作真实 DOM')
        <User ref={userRef} /> // 即 user 必须是类组件
        ```
    * key
        * 提高渲染性能, `唯一标志`。
        * 识别哪些 DOM 改变, 渲染数组的时候用到。
        * 尽量用 ID, 不推荐 index
   


3. 真实 DOM 
    * 真实 dom: 操作DOM成本高, 大量计算
    * 案例
    ```javascript
    
    ```


## Props 的介绍和应用

1. 什么是 props
    * 组件 => 数据 => props, state
    * 无论是 props 改变还是 state 的改变, 都会`引发 render 函数`的渲染

2. 如何使用
    * 从外部传递给内部的一个值。
    * 通过 JSX 属性, 传入设置的属性值。
    * props 对外的接口, 接收外部传入的数据。一般从父组件传递过来。
    * 只读。(不可以被修改)
    * `reatc 数据流单向的`, 组件是可以复用的。所以不能修改 props, 修改后是不可以预测。若修改了 则违背组件的设计原则
    * 若想要修改: `通过中间人 - state`, 把 props 的值赋值给 state.
    ```JavaScript
    // 构造器函数, 如果没有声明 默认添加。只会执行一次
    constructor(props){
        // ES6 的固定写法: 先创建父类实例的 this, 在用子类构造函数修改 this 
        super(props); // props 是对外接口
        this.state = { // state 是对内的状态管理
            newName = props.name
        }
        // ES6 中 不会自动绑定 this, 需要手动绑定this
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(){
        console.log('this 绑定', this);
    }
    ```

3. 组件的分类
    * `函数组件`: 
        * props
        * 无状态组件
        * 函数定义
        * 接收 props, 是通过参数传进来的
    * `类组件`: 
        * state 和 生命周期钩子
        * 有状态组件
        * class定义
        * 接收 props, 通过 this.props 就能获取到
    * 二者的区别: 
        * 在没有 hook 之前, 区别是有无 state 和 生命周期函数。
        * 函数组件 的性能高于 类组件。
    * 有无状态组件是根据: 有无 state 来区分的。
    * 有了 hooks 之后, 函数组件也可以用 state。

4. 设置默认值
    ```javascript
    类名.defaultProps = {
        age: '18'
    }
    ```








## 事件监听 this 绑定

1. this
    * 与执行上下文有关系
    * 函数调用: 
        * 严格模式下, this => undefind
        * 非严格模式下, this => window(全局)
    * 作为方法调用 
        * 谁调用就指向谁
        * 作为构造器函数调用, this 就会指向创建构造器函数的对象
        * 通过 call、applay 修改 this, 即this执行 call、applay 的第一个参数。
    * react 中 class 创建的组件, 需要手动绑定 this。因为 ES6 class 的问题

2. this 四种绑定方式
    1) constructor 中, 通过 `bind 绑定`。 
    * 推荐, 因为 this 只会 绑定一次
        ```javascript
        handleAdd () {
                
        }
        this.handleAdd = this.handleAdd.bind(this);
        ```
    2) 直接在 `JSX 元素进行绑定`
    * 每次渲染组件都会创建一个新的函数。造成额外的渲染，影响性能。不推荐
        ```javascript
        handleAdd () {
                
        }
        <button onClick={this.handleAdd.bind(this)}> 点击加一</button>
        ```
    * 使用箭头函数
        3) ES6 类字段: 箭头函数本身没有 this, 默认指向定义时的对象. 推荐, 也只会绑定一次
        * 定义函数的时候操作
            ```javascript
            handleAdd = () => {
                
            }
            <button onClick={this.handleAdd}> 点击加一</button>
            ```
        4) JSX 元素直接操作。不推荐
            ```javascript
            handleAdd () {
                
            }
            <button onClick={() => {this.handleAdd}}> 点击加一</button>
            ```





## 传值

1. 父组件传值到子组件
    * 通过 `props`

2. 子组件传值到父组件
    * `props`: 接收任意类型值
    * 子组件传递函数, 到父组件
    ```javascript
    // 父组件
    function getChildData(data){
        console.log('接收子组件传递过来的值',data);
    }
    <Footer getChildData={this.getChildData} />

    // 子组件
    handelAdd() {
        this.props.getChildData('传递给父组件的值'+ this.state.count)
    }
    ```