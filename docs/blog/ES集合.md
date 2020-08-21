# ES集合

* 严格模式: `use strict`
* 输出函数执行时间: `console.time('函数名')` 和 ``console.timeEnd('函数名')`


## Babel
> 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。
> 可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。
```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```
1. 安装 Babel: `npm install --save-dev @babel/core`。

2. 配置`.babelrc 文件`: 
    * Babel 的配置文件是`.babelrc`，存放在项目的根目录下

    * 使用 Babel 的第一步，就是配置这个文件。

    * 该文件用来设置转码规则和插件，基本格式如下。

      ```javascript
      {
        "presets": ["@babel/preset-env"],  // 定义转码规则: 将当前 js 版本，编译成es2015版本
        "plugins": []
      }
      ```

    - 所有 Babel 工具和模块的使用，都必须先写好`.babelrc`

3. 命令行转码

    - 安装命令: `npm install --save-dev @babel/cli`

    - 基本用法如下:

      ```javascript
      # 转码结果输出到标准输出
      $ npx babel example.js
      
      # 转码结果写入一个文件
      # --out-file 或 -o 参数指定输出文件
      $ npx babel example.js --out-file compiled.js
      # 或者
      $ npx babel example.js -o compiled.js
      
      # 整个目录转码
      # --out-dir 或 -d 参数指定输出目录
      $ npx babel src --out-dir lib
      # 或者
      $ npx babel src -d lib
      
      # -s 参数生成source map文件
      $ npx babel src -d lib -s
      ```

      

## ES6 编程

1. const、let

   - 常量const: 不能被修改。
     - 否则报错 `Assignment to constant variable.`
     - const 优点:
       - cosnt 比较符合函数式编程
       - const 和 let 本质区别, 编译器内部对处理机制不同。
   - 变量 let

2. 对象解构

   - 数组解构

     ```javascript
     const array = ['香蕉','苹果','橘子'];
     const [first, second, three] = array;
     console.log(three); // 橘子
     ```

   - 对象结构

     ```javascript
     function test(){
       return {
         a: 'hello',
         b: 'world'
       }
     }
     cosnt result = test();
     cosnt {b, a} = result;
     console.log(a); // hello
     ```

3. 字符串模板

   - 在字符串中可以放置变量。用 ``

   - 方法:

     - str.startsWith('hello')  // str 字符串, 是否以 hello 开始
     - str.endsWith('bar')  // str 字符串, 是否以 bar  结尾
     - str.includes('bar')   // str 字符串, 是否包含以 bar  

   - 函数中传递模板字符串

     ```javascript
     const a = '苹果';
     const b = '橘子';
     const c = test `hello ${a} ${b} word`;
     function test(strs, ...values) {
     			console.log(strs, values);
     }
     // 结果
      strs   =>  ["hello ", " ", " word", raw: Array(3)]
      values =>  ["苹果", "橘子"]
     ```

4. 对象和数组

   - 数组

     - `Array.from()`:  把类似数组的东西变成数组

       ```javascript
       const str = "😂😳🤢🥵";
       const result = Array.from(str);
       console.log(result);  // ["😂", "😳", "🤢", "🥵"]
       ```

     - 扩展运算符`...`

       ```javascript
       const str = "😂😳🤢🥵";
       const result = ['🎪', '🎨', ...str];
       console.log(result);  // ["🎪", "🎨", "😂", "😳", "🤢", "🥵"]
       ```

     - 判断一个值是否为数组: `Array.isArray(某值)`

   - 对象

     - 便捷写法

       ```javascript
       const k = 'arr';
       const result = {
         [k+1]:1,
         s,
         q(){
           console.log('💪')
         }
       }
       ```

     - 对象添加属性:

       ```javascript
       const a = {};
       Object.assign(a, {X: 'hello'});
       console.log(a);   // {X: "hello"}
       ```

     - 判断两个值是否为同一个值: 

       ```javascript
       console.log(NaN == NaN);  // false 错误做法
       console.log(Object.is(NaN,NaN)); // true 正确做法
       ```

     - 原型链

       ```javascript
       const eat = {
       	getEat(){
       		return '🥝';
       	}
       };
       
       const drink = {
       	getDrink(){
       		return '🥑';
       	}
       }
       
       let sunday = Object.create(eat);
       console.log(sunday.getEat()); // 找到原型链的方法 🥝
       console.log(Object.getPrototypeOf(sunday)); //查找原型链上的方法用: getPrototypeOf {getEat: ƒ}
       Object.setPrototypeOf(sunday, drink); // 设置原型链上的方法
       console.log(Object.getPrototypeOf(sunday));  //  {getDrink: ƒ}
       console.log(sunday.getDrink()); // 找到原型链的方法 🥑
       ```

     - 原型链:`__proto__`

       ```javascript
       const eat = {
       	getEat(){
       		return '🥝';
       	}
       };
       
       const drink = {
       	getDrink(){
       		return '🥑';
       	}
       }
       
       let sunday = {
         __proto__: eat
       }
       console.log(sunday.getEat()); // 🥝
       sunday.__proto__ = drink; // 显示指定drink到原型链上
       console.log(sunday.getDrink()); // 🥑
       ```

     - 重写父类的方法  `super`

       ```javascript
       const eat = {
       	getEat(){
       		return '🥝';
       	}
       };
       
       const drink = {
       	getDrink(){
       		return '🥑';
       	}
       }
       
       let sunday = {
         __proto__: drink,
         getDrink(){
           return super.getDrink() + '🍰';
         }
       }
       console.log(sunday.getDrink()); // 🥑🍰
       ```

5. 函数

   - 查找函数名字`function.name`

     ```javascript
     const fn = function jing(){
     
     }
     console.log(fn.name); // jing
     ```

   - 箭头函数`() => {}`

     - 正常情况下，`谁调用this, this就指向谁`

       ```javascript
       window.a = 50;
       const obj = {
         a: 40,
         b: function ()  {
           console.log('结果', this.a);
         }
       }
       obj.b()  // 40
       ```

     - **箭头函数中的this** 在定义时就确定了，之后就不能被改变了, `this定义时被绑定到，当前所属对象顶级作用域上`

       ```javascript
       window.a = 100;
       const obj = {
       	a: 40,
       	b: function() {
           // 嘻嘻 {a: 40, b: ƒ}
       		console.log('嘻嘻', this);  
       		const qq = {
       							a: 50,
       							test: () => {
       									console.log(this.a);  // 40
                     }
                	}
            qq.test();
         }
       }
       obj.b()
       ```

   - 函数的**默认传参**

     ```javascript
     function test({options=true}={}, a=1){
         console.log('options是传入参数', options, 'a 是默认参数', a);
       	// false  1
      }
      test({options: false})
     ```

   - 函数**参数的扩展运算符**

     ```javascript
     function test(...result){
       console.log(result);  //结果是数组
       // 0: 30
     	// 1: {options: 111}
     }
     test(30, {options: 111});
     ```

6. iterator(迭代器)

   - 基本使用

     ```javascript
     let fn = function*(){
     		yield('🤙');
     		yield('🦷');
     		console.log('函数');
     }
     const result = fn();
     console.log(result.next());  // {value: "🤙", done: false}
     console.log(result.next());  // {value: "🦷", done: false}
     // 函数
     console.log(result.next());  //{value: undefined, done: true}
     ```

     - `yield` 类似于断点。 运行 `next` 时才会去执行下一个`yield`。
     - iterator是解决异步的办法。将异步变成同步的办法。
     
   - `for of`是 iterator的一种
   
     - 与` for in` 相比, ` for in` 遍历的太深了。`for in`  遍历的是索引
   
     ```javascript
     const  arr = ['👗', '👘', '👙'];
     for(let v of arr){
     	console.log(v); // 0  1  2
     }
     ```
   
     - `for of`遍历数组, 得到的是值
   
     ```javascript
     const  arr = ['👗', '👘', '👙'];
     for(let v of arr){
     	console.log(v); // 👗   👘   👙
     }
     ```
   
     - `for of` 不支持遍历对象。可以先用`object.keys()`得到索引，然后再去遍历对象
   
7. Generator

8. Class

   - 案例

     ```javascript
     class Person{
     		constructor(age){
     			this.age=age;
     		}
     		tell(){
     				console.log(`年龄是 ${this.age}，`);
     		}
     }
     
     class Man extends Person{
       constructor(age){
         super(age);
         this.arr = [];
       }
       set menu(data){
         this.arr.push(data);
       }
       get menu(){
         return this.arr;
       }
       tell() {
         super.tell();
         console.log('Hello');
       }
       static init(){
         console.log('执行静态方法')
       }
     }
     Man.init(); // 执行静态方法
     const xiaowang = new Man(30);
     xiaowang.menu='🧚';  // 调用 set 方法
     console.log(xiaowang.menu); // ["🧚"]  调用 get 方法
     console.log(xiaowang.tell()); // 调用子类 tell 方法。 年龄是 30，Hello
     ```

9. `Set`集合

   - 和数组相似，但不一样。数组可以重复，`Set`不可以重复，成员的值是唯一的。

   - 支持iterator

   - 会自动去重，不会重复元素

     ```javascript
     let arr = new Set('👈🤟👋');
     
     arr.add('😱');
     arr.add('😱'); // 会自动去重
     
     for(let data of arr){
       console.log(data); // 👈 🤟 👋 😱
     }
     
     arr.delete('🤟')  // 删除此值
     
     console.log(arr); //Set(3) {"👈", "👋", "😱"}
     console.log(arr.size); // 3
     console.log(arr.has('🤟')); // false
     
     arr.clear(); // 清除全部元素
     console.log(arr); //Set(0) {}
     ```

10. `Map`集合(字典)

  - 键值对的元素

    ```javascript
    let food = new Map();
    let fruit={}, cook=function(){};
    food.set(fruit, '👀');
    food.set(cook, '🧠');
    
    console.log(food); // Map(2) {{…} => "👀", ƒ => "🧠"}
    console.log(food.get(cook));  // 🧠
    console.log(food.has(fruit));  // 判断是否有此 key
    food.delete(cook);
    console.log(food.size);  // 获取food长度 1
    food.clear();  // 清除全部元素
    console.log(food);   // Map(0) {}
    ```
    
  - 属性和操作方法

    - **size** 属性: 返回 Map 结构的成员总数。

    - **Map.prototype.set(key, value)**

      - `set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

      - `set`方法返回的是当前的`Map`对象，因此可以采用链式写法。

        ```javascript
        let map = new Map()
          .set(1, 'a')
          .set(2, 'b')
          .set(3, 'c');
        ```

    - **Map.prototype.get(key)**

      - `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

    - **Map.prototype.has(key)**

      - `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

    - **Map.prototype.delete(key)**

      - `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

    - **Map.prototype.clear()**

      - `clear`方法清除所有成员，没有返回值。

  - 遍历操作

    - `Map.prototype.keys()`：返回键名的遍历器。

    - `Map.prototype.values()`：返回键值的遍历器。

    - `Map.prototype.entries()`：返回所有成员的遍历器。

    - `Map.prototype.forEach()`：遍历 Map 的所有成员。

    - 注：Map 的遍历顺序就是插入顺序。

    - 示例

      ```javascript
      const map = new Map([
        ['F', 'no'],
        ['T',  'yes'],
      ]);
      
      for (let key of map.keys()) {
        console.log(key);
      }
      // "F"
      // "T"
      
      for (let value of map.values()) {
        console.log(value);
      }
      // "no"
      // "yes"
      
      for (let item of map.entries()) {
        console.log(item[0], item[1]);
      }
      // "F" "no"
      // "T" "yes"
      
      // 或者
      for (let [key, value] of map.entries()) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"
      
      // 等同于使用map.entries()
      for (let [key, value] of map) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"
      ```

11. 经典案例

    - 数组去重
        - 方法一
        ```javascript
        const arr = [12,34,6,98,6];
        const result = [...new Set(arr)];
        console.log(result); // [12, 34, 6, 98]
        ```

        - 方法二
        ```javascript
        const arrayDedup = (arr) => (
            arr && arr.reduce((total, current) => {
                return total.includes(current) ? total: total.concat(current);
            }, [])
        )
        ```


12. Module 模块

    - 非默认

      - 导出 `export` 

        ```javascript
        const test = function(argument) {}
        const gogo = function(argument) {}
        export {test,gogo};
        ```

      - 导入 `import`

        ```javascript
        import {test, gogo } from 'index.js'
        
        test();
        gogo();
        ```
      
    - 默认

      - 导出 `export`
        ```javascript
        const test = function(argument) {}
        const gogo = function(argument) {}
        export default {test,gogo};
        ```
      
      - 导入 `import`
        ```javascript
        import * as data from 'index.js';  // 若是 default，则不要去结构
        
        data.test();
        data.gogo();
        ```

	- system.js`第三方模块加载器

13. `async await` 

    - `await`后面接`Promise`函数

    - 案例

      ```javascript
      (async => {
        function promisefn(url){
          return new Promise(function(resolve, reject){
            $.ajax({
              url:url,
              success: function(){
                resolve(response);
              },
              error: function(){
                reject('error');
              }
            })
          })
        }
        const a1 = await promisefn('http://www.baidu.com/s');
        const a2 = await promisefn('http://www.baidu.com/b');
      
        let p = a1+a2;
        console.log(p);
      })();
      ```
    
14. 装饰器

    - `类的装饰`: 装饰器可以用来装饰整个类。

      - 修饰器是一个函数，用来修改类的行为。
      - 修饰器对类的行为的改变，是代码编译时发生的，而不是运行时。这意味着，修饰器能在编译阶段运行代码。

      ```javascript
      function testable(target) {
        target.isTestable = true;
      }
      
      @testable
      class MyTestableClass {
        // ...
      }
      
      MyTestableClass.isTestable // true
      ```

    - Core-decorators.js

      - 是一个第三方模块，提供了几个常见的装饰器。
      - `@autobind`装饰器使得方法中的 `this`对象，绑定原始对象。
      - `@readonly`装饰器使得属性或方法不可写。
      - `@override`装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。

15. Symbol

    - `唯一`。若想要某值，永远不被改变，则用Symbol。

    - 消除魔法字符串

      ```javascript
      const shapeType = {
        triangle: Symbol()
      };
      
      function getArea(shape, options) {
        let area = 0;
        switch (shape) {
          case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
        }
        return area;
      }
      
      getArea(shapeType.triangle, { width: 100, height: 100 });
      ```


## ES7 编程

1. 数组新增 `includes` 方法:

   - 判断一个`元素`是否存在`数组`中

   - 使用: `数组.includes(元素)` 

     - 存在返回返回 true，不存在返回 false。

2. `Math.pow ` : 指数运算的简写方法   `**`

   - `计算2的3次方`
     - 旧方法: `Math.pow(2,3)`
     - 新方法: `2**3`

## ES8 编程

1. `Async/Await`

   - `next => 返回 Promise`

   - 操作异步代码

     - 嵌套回调
     - Promise
     - Generators

   - 捕获异常

     - 代码实现

       ```javascript
       function promiseFn(){
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             reject('错误信息')
           }, 1500);
         });
       }
       
       // 方法一
       async function fn(){
         try {
           await promiseFn();
           console.log('我在错误下面不会执行');
         }catch(err){
           console.log(err)
         }
       }
       fn();
       
       // 方法二
       async function fn(){
         await promiseFn();
         console.log('我在错误下面不会执行');
       }
       fn().catch(err => {
         console.log(err);
       })
       
       // 方法三: 让错误代码之后的内容正常输出，提前错误的捕获
       async function fn(){
         await promiseFn().catch(err => {
            console.log(err);
         });
         console.log('我会正常输出');
       }
       fn();
       ```

   - 多个 await 异步命令同时执行，并行

     - 代码实现

       ```javascript
       function promiseFn1(){
         return new Promise(resolve => {
           setTimeout(() => {
             resolve('result1');
           }, 1000);
         });
       }
       
       function promiseFn2(){
       	return new Promise(resolve => {
           setTimeout(() => {
             resolve('result2');
           }, 2000);
         })
       }
       
       // 串行
       async function fnC(){
         console.time('fnC');
         let res1 = await promiseFn1();
         let res2 = await promiseFn2();
         console.timeEnd('fnC')
       }
       fnC(); // fnC: 3008.9951171875ms
       
       // 并行
       async function fnB(){
         console.time('fnB');
         let [res1, res2] = await Promise.all([promiseFn1(),promiseFn2()]);
         console.timeEnd('fnB')
       }
       fnB();  // fnB: 2001.199951171875ms
       ```

2. `Object.values()`和`Object.keys()`

   - `Object.values()` 只包含自身的值，不包含继承过来的值

     - 案例

       ```javascript
       const obj = {name: '小明', age: 4};
       
       // 之前
       console.log(Object.keys(obj).map(key => obj[key]))  // 结果: ["小明", 4]
       
       // ES8
       console.log(Object.values(obj))  // 结果: ["小明", 4]
       ```

3. `Object.entries()` 和 `for...in(会枚举原型链中的属性)`

     - `Object.entries()`  会返回键值对的数组
     
       - 案例
     
         ```javascript
         const obj = {name: '小明', age: 4};
         
         console.log(Object.entries(obj)) // [["name", "小明"], ["age", 4]]
         ```
     
     - `Object.entries()`  非对象会强制转换为对象
     
     - 需求，遍历对象的键值
     
       ```javascript
       const obj = {name: '小明', age: 4};
       
       // 方案一
       for(const [key, value] of Object.entries(obj)){
         console.log(`${key}-${value}`);  // name-小明  age-4
       }
       
       // 方案二
       Object.entries(obj).forEach(([key, value]) => {
         console.log(`${key}-${value}`);  // name-小明  age-4
       })
       ```
     
4. `String Padding `

     - `String.prototype.padStart(targetLength, [padString])`: 在字符串的开头进行添加操作
       - targetLength: 目标长度  =>  `添加字符串之后的长度(添加的字符串+原始字符串的长度)`
       - 从右往左数
       - `目标长度 > 添加的字符串+原始字符串的长度(自动截取)`
       - `目标长度 < 添加的字符串+原始字符串的长度(自动重复添加)`
       - 案例: `console.log('123'.padStart(4, '30'))`  //结果:  3123
     - `String.prototype.padEnd`: 在字符串的末尾进行添加操作

5. `结尾允许逗号`

     - 版本检测的时候会用到

       ```javascript
       function fn(para1,para2,){}
       
       const obj = {
         a: '',
         b: '',
       } 
       ```

6. `Object.getOwnPropertyDescriptors()`

     - 获取对象自身属性是描述符

     - 使用:

       ```javascript
       const obj = {name: '小明', age: 4};
       console.log(Object.getOwnPropertyDescriptors(obj));
       ```

7. `SharedArrayBuffer` 和 `Atomics` 

     - 给 js 带来了多线程的功能，高级特性，JS引擎核心的改进

     - 共享内存主要思想: 把多线程引入 JS

     - `JS 主线程`和`web-worker 线程`之间共享数据，用`SharedArrayBuffer`

     - 之前使用`postMessage()` 将数据在线程之间进行传递。现在用`SharedArrayBuffer`共享数据

     - 多线程会存在竞争，引入`Atomics` 来进行枷锁

     - 使用: `new SharedArrayBuffer(length);    缓冲区大小, 以字节byte 为单位`   

       - `arrayBuffer` 无法共享数据
       - `SharedArrayBuffer `可以共享数据

     - 简单实现`主进程`与`worker.js`进程之间的通信`(数据量大 通信效率低)`

       ```javascript
       // 文件:main.js(主线程)
       // 创建一个 work进程
       const worker = new Worker('./worker.js');
       // postMessage用此方法传输数据, 到worker线程
       worker.postMessage('hello I am main')
       worker.onmessage = function(e) {
           console.log(e.data);
       }
       
       
       // 文件:work.js(work线程)
       // message事件, 接收数据 
       onmessage = function (e) {
           console.log(e.data);
           postMessage('hello I am work');
       }
       ```

     - 进程之间共享内存地址

       ```javascript
       // 主线程(main.js)
       // 创建一个 work进程
       const worker = new Worker('./worker.js');
       // 新建1kb 内存
       const sharedBuffer = new SharedArrayBuffer(1024); 
       // 建视图, 写入数组
       const intArrBuffer = new Int32Array(sharedBuffer);
       for(let i=0; i<intArrBuffer.length; i++ ){
           intArrBuffer[i] = i;
       }
       // postMessage 发送的共享内存地址
       worker.postMessage(intArrBuffer); // 分享内存地址
       worker.onmessage = function(e) {
           console.log('更改后的数据', intArrBuffer[20]);
       }
       
       
       // work线程(work.js)
       // message事件, 接收数据 
       onmessage = function (e) {
           let arrBuffer = e.data; // 在主进程中写入数据,在子进程中读
           arrBuffer[20] = 88; // 在 work 进程, 直接修改了内存中的数据 
           postMessage('hello I am worker');
       }
       ```

     - 使用线程枷锁机制, 来读取和修改数据

       ```javascript
       // 主线程(main.js)
       // 创建一个 work进程
       const worker = new Worker('./worker.js');
       // 新建1kb 内存
       const sharedBuffer = new SharedArrayBuffer(1024); 
       // 建视图, 写入数组
       const intArrBuffer = new Int32Array(sharedBuffer);
       for(let i=0; i<intArrBuffer.length; i++ ){
           intArrBuffer[i] = i;
       }
       // postMessage 发送的共享内存地址
       worker.postMessage(intArrBuffer); // 分享内存地址
       setTimeout(() => {
           // 3个参数
           // 参数一: 共享内存的视图数组 
           // 参数二: index 视图数据位置
           // 参数三: count 唤醒的 worker 进程数, 默认 Infinity
           Atomics.notify(intArrBuffer, 11, 1);  // 3S 后自动唤醒
       }, 3000)
       worker.onmessage = function(e) {
           console.log('更改后的数据', Atomics.load(intArrBuffer, 20));
       }
       
       
       
       // work线程(work.js)
       // message事件, 接收数据 
       onmessage = function (e) {
           let arrBuffer = e.data; // 在主进程中写入数据,在子进程中读
           console.log('读取数据的方式', Atomics.load(arrBuffer, 20));  // 使用枷锁方式读取数据
           Atomics.store(arrBuffer, 20, 99);   // 使用枷锁方式修改数据, 返回写入的值   99 
           Atomics.store(arrBuffer, 20, 111);   // 使用枷锁方式修改数据, 返回之前的值  99
           postMessage('hello I am worker');
         
           // 某些线程满足以下条件, 进行休眠
           Atomics.wait(arrBuffer, 11, 11);
           console.log('我已经进入休眠了, 不会被执行了');
           // 某些线程满足以下条件, 进行休眠, 2S 后进行自动唤醒
           Atomics.wait(arrBuffer, 11, 11, 2000);
       }
       ```

     - `Atomics`运算方法

       - `Atomics.add(intArrBuffer, index, value)`: 加运算
       - `Atomics.sub(intArrBuffer, index, value)`: 减运算
       - 位运算: `and or xor`
       - `AtomicscompareExchange(intArrBuffer, index, oldVal, newVal)`: 
         - index 当前位置的值 === oldVal，则写入newVal;  会返回newVal
         - index 当前位置的值 != oldVal，则不写入newVal;   会返回oldVal

## ES9 编程

1. 异步迭代器   `Asyncchronous Iterator`

   - `Iterator` 是一个特殊对象，包含 `next` 方法，`next`方法会返回 一个对象

     - next() => {value, done} 返回一个迭代器对象

     - value 表示对象的值

     - done: 布尔类型。表示迭代是否结束。

     - 实现一个同步迭代器

       ```javascript
       // 创建一个迭代器
       const createIterator = (items) => {
           const keys = Object.keys(items);
           const len = keys.length;  // 长度
           let pointer = 0;  // 指针
           return {
               next(){
                   const done = pointer >= len;
                   const value = !done ? items[keys[pointer++]] : undefined;
                   return {
                       value,
                       done
                   };
               }
           };
       };
       const res = createIterator([12,34,56]);
       console.log(res.next());  // {value: 12, done: false}
       console.log(res.next());  // {value: 34, done: false}
       console.log(res.next());	// {value: 56, done: false}
       console.log(res.next());  // {value: undefined, done: true}
       ```

     - 数组原生具有 iterator 接口

       ```javascript
       const arr = [12,34,10,999];
       
       console.log(typeof arr[Symbol.iterator]);  // function
       
       // 同步迭代器, 配合 for of 使用
       for(const item of arr){ 
         console.log(item);  // 输出数组的每一项元素
       }
       ```

     - 对象没有 iterator 接口，不是一个迭代器

       ```javascript
       var obj = {name: '小名', age: '4'};
       console.log(typeof obj[Symbol.iterator]);  // undefined
       
       
       // 实现一个迭代器
       const obj = {name: '小名', age: '4'};
       // iterator 接口
       obj[Symbol.iterator] = function() {
           const me = this;
           const keys = Object.keys(me);
           const len = keys.length;
           let pointer = 0;
           return {
               next(){
                   const done = pointer >= len;
                   const value = !done ? me[keys[pointer++]] : undefined;
                   return {
                       value,
                       done
                   };
               }
           };
       };
       
       console.log(typeof obj[Symbol.iterator]);  // function
       for(const val of obj){
           console.log(val);  // 小名  4
       }
       ```

   - 区别迭代器和异步迭代器的区别

     - 同步: `next() => {value: '', done: false} `
     - 异步: ``next() => promise`

   - 实现一个异步迭代器

     ```javascript
     const asyncItems = {
         name: '小明',
         age: 4,
         [Symbol.asyncIterator](){
             const me = this;
             const keys = Object.keys(me);
             const len = keys.length;
             let pointer = 0;
             return {
                 next() {
                     const done = pointer >= len;
                     const value = !done ? me [keys[pointer++]] : undefined;
                     return new Promise(resolve => {
                         setTimeout(() => {
                             resolve({value, done})
                         }, 1000)
                     })
                 }
             }
         }
     }
     
     
     // 异步迭代器配合  for...await...of
     async function fn(){
         for await(const val of asyncItems){
             console.log(val);   // 小明  4
         }
     }
     fn();
     ```

     

2. 异步执行语句   `for...await...of`

3. 异步生成器  `Async generator`

   - 生成迭代器对象

   - `Generator函数`

     - `yield`  `*`

     - 同步生成器的案例

       ```javascript
       // 执行函数时，并不会执行函数体
       function* fn(){
           console.log('正常函数我会执行');
           yield 1;
           yield 2;
           yield 3;
           console.log('执行完了');
       }
       
       const iteratorFn = fn(); // 只是创建了一个 iterator
       // 正常函数我会执行
       console.log(iteratorFn.next()); // {value: 1, done: false}
       console.log(iteratorFn.next()); // {value: 2, done: false}
       console.log(iteratorFn.next()); // {value: 3, done: false}
       // 执行完了
       console.log(iteratorFn.next()); //  {value: undefined, done: true}
       ```

   - 异步生成器

     ```javascript
     async function* fn(){
         yield await Promise.resolve(1);
         yield await Promise.resolve(2);
         yield await Promise.resolve(3);
     }
     const asyncI = fn();
     async function fn1(){
         for await(const val of asyncI){
             console.log(val); // 1  2  3
         }
     }
     fn1();
     ```

4. 总结异步迭代器和异步生成器:

   > 同步迭代器和异步迭代器比较: 
   >
   >  - 相同点
   >    	- 都只含有 一个next 方法的对象
   >  - 不同点
   >    	- 同步迭代器的 next，返回 一个`只有value和done`的`普通对象`
   >    	- 异步迭代器的 next，返回一个`只有value和done`的 `promise`
   >    	- 同步迭代器的遍历: `for of`
   >    	- 异步迭代器的遍历: `for await of`

   > 异步生成器: 
   >
   > 	- `异步生成器`可以创建`异步迭代器`
   > 	- 是 `async` 类型的 `Generator` 函数, 内部可以使用`async`表达式等待异步方法完成
   > 	- 可以使用 `for await of`遍历

5. `Promise.finally()`

   - `new Promise`   调用链

   - 无论`正确`还是`错误`都要`执行一段代码`

     ```javascript
     function fn(){
         return new Promise((resolve, reject) => {
             // resolve('正确信息');
             reject('错误信息');
         })
     }
     fn().then(res => {
         console.log(res);
     }).catch(err => {
         console.log(err);
     }).finally(() => {
         console.log('我都会执行');  // 例如: 关闭数据库链接
     })
     ```

6. Rest/Spread

   - `Rest参数`案例

     ```javascript
     function fn(a, b,  ...c){
         console.log(a, b, c);
     }
     fn(1,2,3,4,5,6);  // 1  2  [3, 4, 5, 6]
     
     
     // 扩展运算符, ES6 提供的。仅用于数组
     const arr = [1,2,3];
     console.log([11, 12, ...arr]);
     
     // ES9 提供的，支持对象了。未匹配的放到了 haha 里。 
     const obj = {
         name: '小明',
         age: 4,
         info: {
             phone: 188
         }
     }
     const  {name, ...haha} = obj;
     console.log(name, '===', haha); // 小明 === {age: 4, info: {phone: 188}}
     
     //  用时函数传参也是同样的道理
     const objFn = {
         name: '嘻嘻',
         age: 50,
         info: {
             phone: 001
         }
     }
     function fn({name, ...haha}){
         console.log(name, '===', haha);  // 嘻嘻 === {age: 50, info: {phone: 1}}
     }
     fn(objFn);
     
     
     // 对象的扩展运算符
     const obj1 = {
         name: '嘻嘻',
         age: 50,
         info: {
             phone: 001
         }
     }
     const obj2 = {...obj1, address: '北京'}
     console.log(obj2);  // {name: "嘻嘻", age: 50, info: {phone: 1}, address: "北京"}
     
     
     // 对象的浅拷贝: 修改克隆对象，则不会影响原始对象
     const obj = {
         name: '静静',
         info: {
             phont: 10
         }
     };
     const objClone = { ...obj};
     objClone.name = 'www';
     objClone.info.phont = '20';
     // 对象的浅拷贝
     console.log(obj.name); // 静静
     console.log(objClone.name); // www
     // 对象的深拷贝
     console.log(obj.info.phont);  // 20
     console.log(objClone.info.phont); // 20
     ```

7. 正则表达式的增强: `给分组自定义名称`

   - 需求一: `YYYY-MM-DD`  年月日解析到数组中

     ```javascript
     const dataStr = '2030-08-01'
     
     // 之前的写法
     const reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
     const res = reg.exec(dataStr);
     console.log(res[1], res[2], res[3]); // 通过数组下标获取，想要的值。"2030" "08" "01"
     
     // ES9版本 新的写法 ?<name>
     const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
     const res = reg.exec(dataStr);
     console.log(res.groups.year, res.groups.month, res.groups.day); // "2030" "08" "01"
     ```

   - 需求二:  将`年月日`, 修改为`月日年`

     ```javascript
     const dataStr = '2030-08-01';
     const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
     const newDate = dataStr.replace(reg, `$<month>-$<day>-$<year>`);
     console.log(newDate);  // 08-01-2030
     ```

   - 反向断言

     - ES9中，以相同方式工作，匹配前面的反向断言

     - 反向断言的格式: `(?<=pattern)`

     - 例如：获取价格, 反向断言写法

       ```javascript
       const str = "$123";
       // 通过匹配前面的, 拿到后面的数据
       const reg = /(?<=\D)\d+/;  
       const result = reg.exec(str);
       console.log(result);  // 123
       ```

   - 先行断言。匹配后面的

     -  先行断言的格式: `(?=pattern)当前匹配位置开始, 判断后面的字符串是否成立 ` 
     
     - 例如：获取货币符号, 先行断言写法
     
       ```javascript
       const str = "$123";
       // 先行断言是, 完全匹配后的 \d+, 拿到前面的数据
       const reg = /\D(?=\d+)/;  // \D:非字符  \d:数字  +: 多个
       const result = reg.exec(str);
       console.log(result[0]);  // $
       ```
     
   - `dotAll` 方式

     - `.`:  在正则中表示， 会匹配到除回车符，以外的单字符

       ```javascript
       const str = 'he\nllo';
       const reg = /he.llo/;
       const result = reg.test(str);
       console.log(result);  // false
       ```

     - 弥补回车符的匹配

       ```javascript
       const str = 'he\nllo';
       const reg = /he.llo/s;  // s标记，表示允许换行符的出现
       const result = reg.test(str);
       console.log(result); //true
       ```

   - ES9`汉字匹配`新写法 `/\p{Script=Han}/u`

     - 汉字匹配新写法和旧写法的比较

       ```javascript
       const oldReg = /[\u4e00-\u9fa5]/;  // 繁琐不好记忆
       const str = /你好呀/;
       const newReg = /\p{Script=Han}/u;
       console.log(newReg.test(str));  // true
       ```

   - `非转义序列`的模板字符串

     - 取消转义 `String.raw`

     - 案例

       ```javascript
       // \u unicode转义    \x 十六进制转义
       '\u{54}'  // 自动转义成 T 了
       String.raw`\u{54}`;  // 取消转义
       ```

       

       


​     



















