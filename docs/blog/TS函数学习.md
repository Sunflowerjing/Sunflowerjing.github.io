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




