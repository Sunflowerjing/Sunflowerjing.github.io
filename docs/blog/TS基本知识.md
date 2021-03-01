# TS基本知识

1. TypeScript 介绍:
    * TypeScript 是微软开发的 JavaScript 的超集，TypeScript 兼容 JavaScript，可以载入 JavaScript 代码然后运行。

2. TypeScript 和 JavaScript 比较:
    * 加入注释
    * 让编译器理解所支持的对象和函数
    * 编译器会移除注释，不会增加开销
    * 增加一个完整的类结构, 使之更新是传统的面向对象语言。

3. 语言特性
    * 类 Class
    * 接口 Interfacess
    * 模块 Modules

4. 安装: 
    * Homebrew: 
        * 套件管理器
        * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
        * 验证安装是否成功: 命令行输入 `brew`
    * npm: 
        * npm 全称是 `Node Package Manager`
        * 是 nodeJS 包管理器, `brew install node`
    * typescript: 
        * `npm install -g typescript`
        * 验证是否安装成功: 执行 `tsc` , 进行typescript编译器

5. TS 转换成 JS
    * 执行: `tsc aap.ts`。 自动生成同名的 js 文件

## 基本数据类型
* 主要是声明数据类型
1. `Boolean`:
    * 案例:
    ```javascript
    var isBoon = false; // js

    var isBoon:boolean = false; // ts。若不赋值, 默认 undefind
    ```
2. `Number`:
    * 案例:
    ```javascript
    var num = 0; // js

    var num: number = 6;
    ```
3. `String`:
    * 案例:
    ```javascript
    let name: string = "bob";
    ```
4. `Array`:
    * 案例:两种格式声明数据类型
    ```javascript
    //  第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
    let list: number[] = [1, 2, 3];

    // 第二种方式是使用数组泛型，Array<元素类型>：

    let list: Array<number> = [1, 2, 3];
    let list: Array<string> = ["my", "hello", "嘻嘻"];
    ```
5. `元组 Tuple`
    * `元组类型`允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
    * 比如: 可以定义一对值分别为 string和number类型的元组。
    * 案例:
    ```javascript
    let x: [string, number];
    x = ['hello', 10]; // OK
    x = [10, 'hello']; // Error

    // 当访问一个已知索引的元素，会得到正确的类型：
    console.log(x[0].substr(1)); // OK
    console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

    // 当访问一个越界的元素，会使用联合类型替代：
    x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
    console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
    x[6] = true; // Error, 布尔不是(string | number)类型
    ```
6. `Enum`: 枚举类型
    * 使用`枚举类型`可以为一组数值赋予友好的名字。
    * 一个星期只有7天。一年只有12个月。这种用枚举类型最好了。
    * 案例:
    ```javascript
    // 通过下标,获取值
    enum Color {Red, Green, Blue};
    var colorName: string = Color[1]; // 通过下标获取
    console.log(colorName); // Green
    // 下标进行赋值操作
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2];
    console.log(colorName);  // 显示'Green'因为上面代码里它的值是2


    // 通过属性获取下标
    // 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
    enum Color {Red = 1, Green, Blue}
    let c: Color = Color.Green; // 2
    // 或者，全部都采用手动赋值：
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Green;
    ```
7. `Any`:
    * 任何数据类型
    * 案例:
    ```javascript
    var noSure:any = 10;
    noSure = "hello";
    noSure = false;

    console.log(noSure);// false


    // 数组
    var list:any[] = [1,"hello", false];
    console.log(list[2]); // false
    ```
8. `Void`:
    * 对函数进行声明.
    * void类型像是与any类型相反，它表示`没有任何类型`。 
    * 当一个`函数没有返回值时`，你通常会见到其返回值类型是 void
    * 案例:
    ```javascript
    // 返回类型为 string
    function tell(): string{
        return "hello"
    }

    // 返回类型为 number
    function tell(): number{
        return 10
    }

    // 不返回任何类型
    function tell(): void{
        console.log("This is my warning message");
    }
    ```
    * 声明一个`void类型`的变量没有什么大用，因为只能为它赋予`undefined和null`

9. `Null` 和 `Undefined`
    *  undefined和null两者各自有自己的类型分别叫做undefined和null。 
    * 和 void相似，它们的本身的类型用处不是很大：
    * 案例:
    ```javascript
    let u: undefined = undefined;
    let n: null = null;
    ```
