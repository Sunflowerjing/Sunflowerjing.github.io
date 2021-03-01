# TS函数学习

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









## 函数 lambads 和 this 关键字
1. lambads 函数可以改变 this
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

7. 接口(interfaces)
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

8. 接口的可选属性
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

9. 函数(方法)类型
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




