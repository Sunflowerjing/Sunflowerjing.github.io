# JavaScript面试题目


1. 请写出如下代码输出值，并解释为什么。
```
console.log(a);
console.log(typeof yideng(a));
var flag = true;
if (!flag) {
		var a = 1;
}
if (flag) {
    function yideng(a) {
        yideng = a;
        console.log("yideng1");
    }
} else {
    function yideng(a) {
        yideng = a;
        console.log("yideng2");
    }
}
```
* 解析上题过程会涉及到的知识点
    * 变量提升
    ```
    var flag;
    var a;
    console.log(a);  ===> undefind
    flag = true;
    if (!flag) {  // 此时 if  中的判断语句为 false, 所以 a 就没有赋上值
        a = 1;
    }
    ```
    * if 判断语句中的 true 或 false
    ```
    方式一:
    if(true){
         function test() {
            console.log(123);
        }
    }
    test(); // ES5下面可以提升, 输出123。 若严格模式, 则就另说

   方式二:
    if(false){
         function test() {
            console.log(123);
        }
    }
    test();  //  报错
    console.log(test);  // 输出 undefind

    方式三:  存在 if
    test(); // 报错
    console.log(test); => undefind, 只是提升了函数名
    if(true){
         function test() {
            console.log(123);
        }
    }
    console.log(test); => 函数体


    方式四:  如果没有 if
    console.log(test); => 函数体
    function test() {
        console.log(123);
    }
    console.log(test); => 函数体


    方法五: 块级作用域, 块内保护。函数的里面改变和外面改变是不一样的
    有块, 内部的修改, 改变不了外面。如果是 let 或者 const 就提升不上去了
    if(true){  // 在有块的情况下, 内部的修改不会影响到外部
        function test() {
            test = 123  // 函数里面改变, 影响不到函数
            console.log(123);
        }
        test = 456;  // 函数外面改变, 就会对函数有影响
        console.log('内部', test); => 456
    }
    console.log('函数体', test); 
    => function test() {
            test = 123
            console.log(123);
        }

    方法五的案例
    {
        function yideng(){}
        yideng = 123;
        console.log(typeof yideng);  => number
    }
    console.log(typeof yideng); => function

    // 修改
    var yideng = function xxx(){  //  此时这个xxx函数是受保护的
        xxx = 1;
        console.log(xxx);  
    }
    yideng();

    输出:
    ƒ xxx(){
        xxx = 1;
        console.log(xxx);
    }
    ```
    * 函数提升
    ```
    var yideng; => undefind, 只是提升了函数名
    var flag;   => undefind
    var a;      => undefind

    console.log(a);  => undefind
    console.log(typeof yideng(a));  => 报错, yideng is not undefind
    flag = true;
    if (!flag) { // 没有赋值成功
            a = 1;
    }
    if (flag) {
        yideng = function yideng(a) {
            yideng = a;
            console.log("yideng1");
        }
    } else {
        yideng = function yideng(a) {
            yideng = a;
            console.log("yideng2");
        }
    }
    ```
  















2. 请写出如下输出值
```
function fn(){
    console.log(this.length); 
}
var yideng = { 
    length:5,
    method:function(){ 
        "use strict";
        fn();  => 0
        console.log(arguments); => 2个参数
        arguments[0]()   => 2 
    }
}
const result = yideng.method.bind(null);
result(fn,1);

``` 
* `函数 bind 后, 是没有 prototype 的`
* bind(null) 是软绑, 相当于什么都没有做
* `window.length` => 代表页面中: iframe 的数量
* 严格模式下的考点: 禁止 this 指向全局对象。
```
正常情况下
function test(){
    console.log(this); => window
}
test();

严格模式下
"use strict"
function test(){
    console.log(this); => undefind
}
test();
```
* 修改上面的题目
```
function fn(){
    "use strict";
    console.log(this.length);  => 报错了: Cannot read property 'length' of undefinde
}
var yideng = { 
    length:5,
    method:function(){ 
        fn(); 
        console.log(arguments);
        arguments[0]()  
    }
}
const result = yideng.method.bind(null);
result(fn,1);

```




