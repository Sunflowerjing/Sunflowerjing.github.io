# javascript报错处理

## is not defined 和 undefined
> JS中关于变量常遇到的错误有两个，一个是“xx is not defined”,另一个是“undefined”。
1. 区别
    * undefined
    ```js
    var a;  //只声明变量，未赋值
    console.log(a);  //undefined
    ```
    * is not defined
    ```js
    //var a;
    console.log(a);  //未声明变量且未赋值，a is not define
    ```
    * 结论:
        * 声明变量却没有对其进行赋值，即变量 `undefined`
        * 未声明也未赋值变量，即变量`not defined`.
        * `undefined`: 不明确的，也就是不知道用来干嘛的;
        * `not defined`: 未定义的

2. 测试一个变量是否在javascript中定义
    * `if('wx' in window) console.log('存在 wx 这个变量')`
    * `if(typeof(wx) !== 'undefined') console.log('存在 wx 这个变量')`