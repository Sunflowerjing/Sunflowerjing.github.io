# TS函数接口泛型

##  函数定义
1. JavaScript 函数
    * 命名函数
    ```javascript
    // Named function
    function add(x, y) {
        return x + y;
    }
    ```
    * 匿名函数
    ```javascript
    // Anonymous function
    let myAdd = function(x, y) {
         return x + y; 
    };
    ```
2. TypeScript 函数
    * 命名函数: 
    ```javascript
    // 添加了参数类型和函数类型。
    function add(x:number, y:number):string {
        return "hello typescript";
    }
    ```
    * 匿名函数
    ```javascript
    // Anonymous function
    let myAdd = function(x:number, y:string):string {
        return "hello typescript";
    };
    ```
    * 详细写法
    ```javascript
    // name类型string, age类型number
    // => 后面的 number 表示函数的返回类型
    var myAdd:(name:string, age:number) => number = function(n:string, a:number):number {
        // n 代表 name
        // a 代表 age
        return a;
    }
    ```

## 函数参数
1. `可选参数`和`默认参数`
    * `可选参数`: `?`
    ```javascript
    function buildNmae(firstName: string, lastName?:string){
        if(lastName){
            return firstName+" "+lastName;
        } else {
            return firstName;
        }
    }

    var result1 = buildNmae("iwen","ime"); // 正确
    var result2 = buildNmae("iwen"); // 正确

    var result3 = buildNmae("iwen","ime", "if"); // 错误
    ```
    * 默认参数
    ```javascript
    function buildNmae(firstName: string, lastName="iwen"){
       return firstName+" "+lastName;
    }

    var result1 = buildNmae("hello: "); // 正确
    var result2 = buildNmae("iwen","ime"); // 正确
    var result3 = buildNmae("iwen","ime", "if"); // 错误
    ```
2. 可变参数
    * 优点: 不受参数个数的限制. `类型要统一`
    ```javascript
    function people(firstName: string, ...restOfname:string[]) {
        return firstName+ "" + restOfname.join(" ");
    }

    var pn = people("iwen","ime","if");
    ```









## 函数 Lambda 和 this 关键字
1. Lambda 函数可以改变 this
    * 案例
    ```javascript
    var people = {
        name: ["iwen", "ime", "if", "bean"];
        getName: function() {
            return () => { // 这里主要 可改为 return function {, 输出 undefind
                var i = Math.floor(Math.random()*4);
                return {
                    n: this.name[i]
                }
            }
        }
    }

    // 结果
    var MyName = people.getName();
    MyName().n // 正常输出。

    // return () => { 改为 return function(){ 
    // 则 MyName 为 undefind
    ```


## 函数重载
* 案例
```javascript
function attr(name: string):string;
function attr(age: number):number;

function attr(nameorage:any):any{
    if(nameorage && typeof nameorage === "string"){
        alert("姓名");
    } else {
        alert("年龄");
    }
}

attr("Hello"); // 姓名
attr(10); // 年龄
```


## 类 Class

1. 创建类
```javascript
    // class 类名
    class Person{
        // 属性
        name: string;
        age: number;

        // 构造方法: 这里的构造方法,不是通过类名的形式实现
        constructor(name:string, age: number){ 
            this.name = name;
            this.age = age;
        } 

        // 方法 或者 函数
        print(){
            return this.name+":"+this.age;
        }
    }

    var p = new Person("ime", 80);
    p.print();
```

2. 类的继承
```javascript
class Person {
    name: string;
    age: number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    tell(){
        return this.name + ":" +this.age;
    }
}


class Student extends Person {
    school: string;
    constructor(school:string){
        super("ime", 8000)
        this.school = school;
    }
    tell(){
        return this.name + ":" + this.age + ":" + this.school ;
    }
}

var s = new Student("北大");

s.tell();
```

3. 访问修饰符
    * `public`: 公共的。属性默认public
    * `private`: 私有的
    ```javascript
    class People {
        public name: string;
        age: number;
    
        constructor (private name:string, age: number){ // 设置 private 报错
            this.name = name;
            this.age = age;
        }

        print(){
            return this.name + ":" +this.age;
        }
    }

    class Teacher extends People {
        school: string;
        constructor (school: string){
            super("ime", 8000)
            this.school = school;
        }
        print(){
            return this.name + ":" +this.age + ":" + this.school;
        }
    }

    var t = new Teacher("清华");
 
    t.print()
    ```

4. 封装
```javascript
class Hello {
    private _name:string;
    tell(){
        return this.name;
    }
    get name():string{
        return this._name;
    }

    set name(newNmae:string){ // 可以根据业务场景做正则判断
        this._name = newNmae;
    }
}

var h = new Hello();
h.name = "iwen";
h.tell()
```

5. 静态属性
    * `static`: 静态的。 不能通过对象形式调用, 通过`类名调用`
    ```javascript
    class Person {
        static name:string;
        tell(){
            console.log('姓名:'+ Person.name);
        }
    }

    var  p = new Person();
    Person.name = "iwen";

    p.tell();
    ```

6. 进阶技巧
    * 创建类, 相当于创建一个类型。 `引用数据类型`
    ```javascript
    class Greeter {
        greeting: string;
        constructor (message: string){
            this.greeting = message;
        }
        greet(){
            return "hello" + this.greeting;
        }
    }

    var g:Greeter;
    g = new Greeter("iwen");
    g.greet()

    ```

## 接口(interfaces)
1. 基本用法
    ```javascript
    // 之前写法
    function printeLabel(labelObj:{label:string}){
        console.log(labelObj.label);
    }

    var myObj = { label: "Hello"}
    printeLabel(myObj);


    // 最好写法
    interfaces LabelValue {
        label: string;
    }
    function printeLabel(labelObj:LabelValue){ // 指定类型为接口类型
        console.log(labelObj.label);
    }

    var myObj = { label: "Hello"}
    printeLabel(myObj);
    ```

2. 接口的可选属性
    * 使用 `?` 表示可选
    ```javascript
    interfaces USB{
        name?: string;
        age?: number;
    }

    function prinitUSB(pu:USB){
        console.log(pu.name);
        console.log(pu.age);
    }

    var my = {name: "ime"};
    prinitUSB(my.name)

    ```

3. 接口函数(方法)类型
    ```javascript
    // 接口检查不是名称的检查，是类型的检查
    interfaces SearchFunc {
        // 参数是string类型，返回值是boolean类型
        (source: string, subString: string): boolean;
    }

    var mySearch:SearchFunc;
    mySearch = function(src:string, sub:string){
        var result = src.search(sub);
        if(result != -1){
            return  true;
        } else {
            return  false;
        }
    }
    ```

4. 接口数组类型
    ```javascript
    interface StringArray {
        // 数组每项返回string
        [index:number]: string
    }
    
    var myArray:StringArray;
    myArray = ["iwen", "ime"];
    console.log(myArray[1]);
    ```

5. 接口Class 类型
    ```javascript
    // 接口 class 中的内容是不能直接实现，只是定义好了 
    interface ClockInterface {
        currentTime: Date;
        setTime(d:Date);
    }
    // 实现接口用 implements
    class Clock implements ClockInterface {
        // 实现接口的属性 => 复写
        currentTime: Date;
        setTime(d:Date){
            this.currentTime = Date
        }
        constructor(h:number,m:number){

        }
    }
    ```

6. 接口继承与混合类型
    ```javascript
    // 接口之间的继承
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke{
        sideLength: number;
    }

    var s = <Square>{};
    s.color ="red";
    s.penWidth = 20;
    s.sideLength = 10;


    // 混合类型
    interface Counter {
        interval:number;
        reset():void;
        (start:number): string;
    }
    var c.Counter;
    c(10);
    c.reset();
    ```



## 泛型

1. 基本用法
    * `<T>` 或者其他的大写字母
    ```javascript
    // 声明时不需要指定类型, 调用时指定类型
    function Hello<T>(arg:T):T{
        return arg;
    }

    var output = Hello<string>("hello ime");
    alert(output);
    ```


2. 泛型的应用
    ```javascript
    // 泛型的属性 是根据所传输的类型决定的
    function Hello<T>(str:T[]):T[]{
        return str;
    }

    var list:Array<string> = Hello<string>(["1","2","3"]);
    for(var i=0; i<list.length; i++){
        console.log(list[i])
    }
    ``` 

3. 泛型类型
    ```javascript
    // Lambda 表达式 使用泛型
    function Hello<T>(arg:T):T {
        return arg;
    } 
    var myHello:<k>(arg:k) => k = Hello;
    myHello("hello");



    // 普调用法
    function Hello<T>(arg:T):T {
        return arg;
    }
    var myHello:{<T>(arg:T):T} = Hello;
    myHello("hello");


    // 接口泛型的使用
    interface Hello {
        <T>(arg:T):T;
    }
    function myHello<T>(arg:T):T{
        return arg;
    }
    var MH:Hello = myHello;
    MH<string>("Hello");


    // 定义接口时直接定义泛型
    interface Hello<T> {
        (arg:T):T;
    }
    function myHello<T>(arg:T):T{
        return arg;
    }
    var MH:Hello<number> = myHello;
    MH(100);

    // Lambda 表达式基础用法, 是一个匿名函数
    var myFunc:(a:number) => string = function(a:number):string {
        return "Hello"+a;
    }
    console.log(myFunc(2));

    ```

4. 泛型类
    ```javascript
    Class HelloStr<T> {
        name:T;
        add:(x:T,y:T) => T
    }
    var myHelloNumber = new HelloStr<string>();
    myHelloNumber.name = "jingjing";
    myHelloNumber.add = function(x,y){
        return x+y;
    }
    console.log(myHelloNumber.name);
    console.log(myHelloNumber.add("hello:", myHelloNumber.name));
    ```


## modules
1. 基本用法
    * module 模式优点:
        * 模块化
        * 可重用
        * 封装变量和函数
        * 由此可得 `面向对象的思想` 重要性
        * 所有函数的 `声明和实现` 都在同一个地方
    * 匿名函数闭包
        ```javascript
        (function(){
            // 内部代码
            d; // 闭包中创建一个 d, 就是全局的 
        })()
        ```
        * `隐藏的全局变量`: 当一个变量被使用, 编译器会向上查询用 `var 声明的变量`的语句，如果没有找到则认为是全局定义的变量。
        ```javascript
        var a; // 全局
        function hello(){
            var b; // 局部的
            c; // 全局
        }

        // 全局的变量的传递
        (function($, w){
        
        })(jQuery, window)
        ```
    * module 
    ```javascript
    var jModule = function(vip){
        // 声明私有成员, 
        var yVip = document.getElementById(yip);
        // 全局
        QQ = '1084549948';
        return {
            // 公开的成员: 外部可以访问的
            add: function(t){
                if(t>=12){
                    var yV = t;
                    yVip.innerHTML = '年费' + yV + '--QQ 群' + QQ;
                } else {
                    var mV = t;
                    yVip.innerHTML = '月费' + mV; 
                }
            }
        }
    }

    var jing= new jModule("vip");
    jing.add(12);

    ```

2. 模块-泛型类型
    ```javascript
    // 不是module写法
    interface StringValidator {
        isAcceptable(s:string):boolean;
    }
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0~9]+$/;
    class LettersOnluValidator implements StringValidator{
        isAcceptable(s:string):boolean {
            return lettersRegexp.test(s);
        }
    }
    class ZipCodeValidator implements StringValidator{
        isAcceptable(s:string):boolean {
            return s.length === 5 && numberRegexp.test(s) ;
        }
    }


    // module写法
    module Validation {
        var lettersRegexp = /^[A-Za-z]+$/;
        var numberRegexp = /^[0~9]+$/;
        export interface StringValidator {
            isAcceptable(s:string):boolean;
        }

        export class LettersOnluValidator implements StringValidator{
            isAcceptable(s:string) {
                return lettersRegexp.test(s);
            }
        }

         export class ZipCodeValidator implements StringValidator{
            isAcceptable(s:string):boolean {
                return s.length === 5 && numberRegexp.test(s) ;
            }
        }
        
    }
    ```

3. 模块-泛型类
    ```javascript
    // timer.ts 文件
    module Time {
        export class Test {
            element: HTMLElement;
            span: HTMLElement;
            timer: nubber;

            constructor(e:HTMLElement) {
                this.element = e;
                this.element.innerHTML = "现在时间是";
                this.span = document.createElement("span");
                this.element.appendChild(this.span);
                this.span.innerHTML = new Date().toTimeString();
            }

            start() {
                this.timer = setInterval(() => this.span.innerHTML = new Date().toTimeString(), 500)
            }

            stop(){
                clearInterval(this.timer);
            }
        }
    }


    // 使用timer.ts 的 timerJS.ts 文件
    var div = document.createElement("div");
    document.body.appendChild(div);
    var obj = new Time.Test(div);
    var btn1 = document.createElement("button");
    btn1.innerHTML = "start";
    btn1.onClick = function() {
        obj.start();
    }
    document.body.appendChild(btn1);
    var btn2 = document.createElement("button");
    btn2.innerHTML = "stop";
    btn2.onClick = function() {
        obj.stop();
    }
    document.body.appendChild(btn2);
    ```
