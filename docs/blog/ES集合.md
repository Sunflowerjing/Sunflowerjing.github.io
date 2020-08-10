# ES集合

* 严格模式: `use strict`


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

      ```javascript
      const arr = [12,34,6,98,6];
      const result = [...new Set(arr)];
      console.log(result); // [12, 34, 6, 98]
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

