# JavaScript函数编程


    
 

## 函数编程的理解
![JavaScript函数编程](函数编程.png)

1. `所有成员`是一个`集合` 
2. `变形关系`是`函数`

## 函数式编程基础理论
1. `数学中的函数书写`: 如下形式`f(X)=Y`。一个`函数F`,已`X为参数`， 并返回`输出Y`。这很简单，但是包含几个关键点:
    * 函数必须总是`接受一个参数` (若有多元的，则转换成一元的)
    * 函数必须`返回一个值`
    * 函数应该依据接`收到的参数`(如X)`而不是外部环境`运行
    * 对于`给定的X只会输出唯一的Y`。
2. 函数式编程不是用函数来编程，也不是传统的面向过程编程。主旨在于`将复杂的函数符合成简单的函数`(计算理论，或者递归论， 或者拉姆达演算)。`运算过程尽量写成一系列嵌套的函数调用`(lambda 函数)
3. 通俗`函数`写法 `function xx(){}`, 要区别开`函数`和`方法`。
    * 方法要与指定的对象绑定`( obj={ test(){} } )`、函数可以直接调用。
    * 函数就是没有 this。`不属于某个对象, 直接调用`。
    * 方法属于某个对象或者类。
4. HOC: 高阶函数

## 函数式编程思想深入
1. `函数是一等公民(表示到处可以用)`。所谓”第一等公民”(`first class`)，指的是函数与其他数据类型一样，处于平等地位。可以`赋值给其他变量`，也`可以作为参数`，传入另一个函数，或者`作为别的函数的返回值`。
2. `不可改变量`。在函数式编程中，我们通常理解的变量在函数式编程中也被函数代替了: 在函数式编程中`变量仅仅代表某个表达式`。这里所说的’变量’是不能被修改的。`所有的变量只能被赋一次初值`
3. map & reduce 他们是最常用的函数式编程的方法。
4. 总结:
    * 函数是”第一等公民”
    * 只用”表达式"，不用"语句"。例如: if else、try catch都不存在
    * 没有”副作用"
    * 不修改状态
    * 引用透明(`函数运行只靠参数且相同的输入总是获得相同的输出`)
    identity=(i)=>{return i} 调用identity(1)可以直接替换为1 该过程被称为`替换模型`


## 函数式编程常用核心概念
1. 纯函数
    * `对于相同的输入，永远会得到相同的输出`，而且没有任何可观察的副作用，`也不依赖外部环境的状态`。
    * `Array.slice`是纯函数，因为它没有副作用，`对于固定的输入，输出总是固定的`。
    * `splice` 就不是纯函数，会改变原数组
    * 优点: 纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性
    ```
    import _ from 'lodash';
    var sin = _.memorize(x => Math.sin(x));
    //第一次计算的时候会稍慢一点 
    var a = sin(1);
    //第二次有了缓存，速度极快
    var b = sin(1); 
    ```
    * 缺点
    ```
    //不纯的
    var min = 18;
    var checkage = age => age > min;
    //纯的，这很函数式
    var checkage = age => age > 18;

    在不纯的版本中，checkage 不仅取决于 age 还有外部依赖的变量 min。
    纯的 checkage 把关键数字 18 硬编码在函数内部，扩展性比较差，柯里化优雅的函数式解决。
    ```
    * 纯度和幂等性
        * `幂等性`是指`执行无数次后`还具`有相同的效果`，`同一的参数``运行一次函数`应该与`连续两次`结果一致。
        * `幂等性在函数式编程中与纯度相关，但有不一致。`
        * `纯函数`: 表示输入和输入一致。`单独执行`
        * `幂等性`: 表示函数运行一次和运行多次是一样的。例如: `Math.abs(Math.abs(-42))`。`套起来执行`

2. 偏应用函数、函数的柯里化 
    * `柯里化`隶属于`偏应用函数`, 柯里化的解决方式是偏应用函数的一个`子集`。
    * `偏应用函数(partial application)`: 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
        * 偏函数之所以“偏”，在就在于其只能处理那些能与`至少一个case语句匹配的输入`，`而不能处理所有可能的输入`。
        * 偏应用函数案例: 接收 => 返回(接收) => 返回
        ```
        // 带一个函数参数 和 该函数的部分参数 
        const partial = (f, ...args) =>
                        (...moreArgs) => f(...args, ...moreArgs)
        const add3 = (a, b, c) => a + b + c

        // 偏应用 `2` 和 `3` 到 `add3` 给你一个单参数的函数 
        const fivePlus = partial(add3, 2, 3)
        fivePlus(4)

        //bind 实现
        const add1More = add3.bind(null, 2, 3) // (c) => 2 + 3 + c
        ```
    * `函数的柯里化`
        * 柯里化 (Curried) 通过偏应用函数实现。`它是把一个多参数函数转换为一个嵌套一元函数的过程。`
        * `传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数`。
        * 我们一起来用柯里化来改他
        ```
        var checkage = min => (age => age > min); 
        var checkage18 = checkage(18); 
        checkage18(20);
        ```
        * 函数的柯里化code: `转换为一元函数`
        ```
        // 柯里化之前
        function add(x, y) {  // 这个就是多元函数
            return x + y; 
        }
        add(1, 2) // 3
        // 柯里化之后
        function addX(y) {
            return function (x) { 
                return x + y;
            }; 
        }
        addX(2)(1) // 3
        ```
        * 函数柯里化优缺点
        ```
        import { curry } from 'lodash';
        var match = curry((reg, str) => str.match(reg)); 
        var filter = curry((f, arr) => arr.filter(f));
        var haveSpace = match(/\s+/g); 
        //haveSpace(“ffffffff”);
        //haveSpace(“a b");
        //filter(haveSpace, ["abcdefg", "Hello World"]); 
        filter(haveSpace)(["abcdefg", "Hello World"])  最优办法
        ```
        * 事实上柯里化是一种`“预加载”函数的方法`，通过传递较少的参数， 得到一个已经`记住了这些参数的新函数`，某种意义上讲，`这是一种对参数的“缓存”`，是一种非常高效的编写函数的方法。
    * 柯里化和偏应用的区别: `柯里化的参数列表是从左向右的`, 偏应用函数不用关系顺序(含有占位符)。所以说柯里化是偏应用函数的一个子集。
        * 例如 bind 严格意义讲, 是 偏应用 函数
        ```
        function foo(p1, p2) {
            this.val = p1 + p2; 
        }
        var bar = foo.bind(null, “p1”);  // null 是占位符
        var baz = new bar("p2"); console.log(baz.val);  `
        ```
    * `函数的反柯里化`
        * `函数柯里化`: 是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了`缩小适用范围`，创建一个针对性更强的函数。
        * `反柯里化函数`: 意义和用法跟函数柯里化相比正好相反，`扩大适用范围`，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象。
        * 函数的反柯里化code
        ```
        Function.prototype.uncurring = function() { 
            var self = this;
            return function() {
                var obj = Array.prototype.shift.call(arguments);
                return self.apply(obj, arguments); };
            };
        var push = Array.prototype.push.unCurrying(),
        obj = {};
        push(obj, "first", "two"); 
        console.log(obj);
        ```
3. 函数组合
    * `纯函数`以及如何把它`柯里化`写出的`洋葱代码 h(g(f(x)))`， 为了解决函数嵌套的问题，我们需要用到`“函数组合”`:
    * 例子:
    ```
    const compose = (f, g) => (x => f(g(x)));
    var first = arr => arr[0];
    var reverse = arr => arr.reverse();
    var last = compose(first, reverse);
    last([1,2,3,4,5]);
    ```
    * 图解: 
    ![函数组合](函数组合.png)
        * 以下方式都称为函数组合
        * compose(f, compose(g, h)) 
        * compose(compose(f, g), h) 
        * compose(f, g, h)
    * 函数组合子
        * `compose函数`只能组合`接受一个参数的函数`，类似于`filter、map`接受两个参数(`投影函数`: 总是在应用转换操作, 通过传入高阶参数后返回数组)，不能被直接组合可以借助偏函数包裹后继续组合。
        * `函数组合的数据流是从右至左`，因为`最右边的函数首先执行`， 将数据传递给下一个函数以此类推，有人喜欢另一种方式最左侧的先执行，我们可以实现`pipe`(可称为管道、序列)来实 现。它和compose所做的事情一样，只不过交换了数据方向。
        * 因此我们需要组合子`管理程序的控制流`。
        * 命令式代码能够使用 `if-else` 和 `for` 这样的过程控制，函数式则不能。
            * 所以我们需要`函数组合子`。
            * 组合子可以组合其他函数(或其他组合子)，并作为控制逻辑单元的`高阶函数`，组合子通常不声明任何变量，也不包含任何业务逻辑，他们旨在管理函数程序执行流程，并在链式调用中对中间结果进行操作。
        * 常见的组合子如下
            * 辅助组合子:
                * 无为(nothing)、照旧(identity)、默许(defaultTo)、恒定(always)
            * 函数组合子
                * 收缩(gather)、展开(spread)、颠倒(reverse)、左偏(partial)、右偏 (partialRight)、`柯里化(curry)`、`弃离(tap)`、`交替(alt)`、补救(tryCatch)、同时 (seq)、聚集(converge)、映射(map)、分捡(useWith)、规约(reduce)、`组合(compose)`
            * 谓语组合子
                * 过滤(filter)、分组(group)、排序(sort)
            * 其它: 组合子变换 juxt
            * 分属于SKI组合子。
4. Point Free 
    * 把一些对象自带的方法转化成纯函数, 不要命名转瞬即逝的中间变量。
    * 这个函数中，我们使用了 str 作为我们的`中间变量`，但这个中间变量除了让代码变得长了一点以外是毫无意义的。
    * const f = str => str.toUpperCase().split(' ‘);  // 错误案例
    * 正确案例
    ```
    var toUpperCase = word => word.toUpperCase(); 
    var split = x => (str => str.split(x));
    
    var f = compose(split(' '), toUpperCase); 
    f("abcd efgh");

    // 这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通用。
    ```
5. 声明式与命令式代码 
    * `命令式代码`的意思就是，我们通过`编写一条又一条指令`去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。
    ```
    let CEOs = [];
    for(var i = 0; i < companies.length; i++) {
        CEOs.push(companies[i].CEO) 
    }
    ```
    * `声明式`就要优雅很多了，我们通过`写表达式的方式来声明`我们想干什么，而不是通过一步一步的指示。
    ```
    let CEOs = companies.map(c => c.CEO);
    ```
    * `函数式编程`的一个明显的好处就是这种`声明式的代码`，对于`无副作用的纯函数`，我们完全`可以不考虑函数内部是如何实现的`，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。
    * `不纯的函数式`代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。
    * `类SQL数据: 函数即数据`
        * `_.from(persons).where().select().vallue();` 已函数形式对数据建模，也就是函数即数据。声明式的描述了数据输出是什么，而不是数据是如何得到的。
        ```
        select p.firstname from persons p where ...group by ..
        _.mixin({
            "select":_.pluck,
            "from":_.chain,
            "where":_.filter, 
            "groupby":_.sortByOrder
        });
        const persons = {}
        ```
6. 惰性求值 ???
    * 惰性链:` _.chain(数据).map().reverse().value()` 惰性链可以添加一个`输入对象的状态`，从而能够将这些输入`转换为所需的输出操作链接在一起`。与简单的数组操作不一样，尽管他是一个复杂的程序，但仍然可以避免创建任何变量，并且有效消除所有循环。`且在最后调用value之前并不会真正的执行任何操作`。这就是所谓的`惰性链~`
    ```

    ```
    * 惰性求值: `当输入很大但只有一个小的子集有效时，避免不必要的函数调用就是所谓的惰性求值。`惰性求值方法有很多如组合子(alt-类似于 || 先计算fun1如果返回值是false、null、undefined就不再执行 fun2、memoization、shortcut funsion)，但是目的都是一样的，`即尽可能的推迟求值，直到依赖的表达式被调用。`
    ```
    // 组合子
    const alt = _.curry((fun1,fun2,val) => fun1(val) || fun2(val));
    const showStudent = _,compose(函数体1, alt(xx1, xx2));
    showStudent({});
    // 记忆
    var object = {a: "xx", b: 2};
    var values = _.memoize(_.values);
    values(object);
    object.a = '你好';
    console.log(values.cache.get(object));
    ```
    * 惰性函数: 惰性函数很好理解，`假如同一个函数被大量范围，并且这个函数内部又有许多判断来来检测函数，这样对于一个调用会浪费时间和浏览器资源，所有当第一次判断完成后，直接把这个函数改写，不在需要判断。`
    ```

    ```
7. 高阶函数
    * 定义: `函数当参数，把传入的函数做一个封装，然后返回这个封装函数,达到更高程度的抽象。`(传函数, return函数)
    * 实现
    ```
    var add = function(a,b){
            return a + b; 
        };
    function math(func,array){ 
        return func(array[0],array[1]); 
    }
    math(add,[1,2]); // 3
    ```
    * 特点
        * 它是一等公民
        * 它已一个函数作为参数
        * 已一个函数作为返回结果
8. 尾调用优化PTC
    * `指函数内部的最后一个动作是函数调用`。`该调用的返回值，直接返回给函数`。`函数调用自身，称为递归`。`如果尾调用自身，就称为尾递归`。递归需要 保存大量的调用记录，很容易发生栈溢出错误，如果使用尾递归优化，将递归 变为循环，那么只需要保存一个调用记录，这样就不会发生栈溢出错误了。
    * 实例:
    ```
    function factorial(n, total) { 
        if (n === 1) return total;
        return factorial(n - 1, n * total); 
    } // ES6强制使用尾递归
    ```
    * 尾递归问题?
        * 1. 问题一: 
            * 尾递归的判断标准是函数运行`【最后一步】`是否调用自身， 
            * 而`不是` 是否在函数的【`最后一行】` 调用自身, 
            * 最后一行调用其他函数 并返回叫尾调用。
        * 2. 问题二: 
            * 按道理尾递归调用调用栈永远都是更新当前的栈帧而已，这样就完全避免了爆栈的危险。
            * 但是现如今的浏览器并未完全支持原因如下
                * 在引擎层面消除递归是一个隐式的行为，程序员意识不到。
                * 堆栈信息丢失了开发者难已调试。
        * 3. 问题三: 既然浏览器不支持我们可以把这些递归写成while~
9. `闭包`: 保存那个函数的执行上下文(拿到了不应该拿的东西)
    * 虽然外层的 makePowerFn 函数执行完毕，`栈上的调用帧被释放，但是堆上的作用域并不被释放`，因此 power 依旧可以被 powerFn 函数访问，这样就形成了`闭包`
    * 实例
    ```
    function makePowerFn(power) {
        function powerFn(base) {
            return Math.pow(base, power); 
        }
        return powerFn; 
    }
    var square = makePowerFn(2); 
    square(3); // 9
    ```
10. 容器、Functor(函子)
    * 我们可以把`”范畴”`想象成是一个`容器`，里面包含两样东西。`值 (value)`、`值的变形关系，也就是函数`。
    * `范畴论使用函数，表达范畴之间的关系。`
    * 函数不仅可以用于`同一个范畴之中值的转换`，还可以用于将`一个范畴转成另一个范畴`。这就涉及到了`函子(Functor)`。
    * 容器是函子, 即有 value。一个东西有value，一个容器是一个范畴。
    * `$(...)` 返回的对象并不是一个原生的 DOM 对象，而`是对于原生对象的一种封装`，这在`某种意义上就是一个“容器”(但它并不函数式)`。
    * `Functor(函子)遵守一些特定规则的容器类型`。
    * `Functor 是一个对于函数调用的抽象`，我们赋予容器自己去调用函数的能力。
        * 把东西装进一个容器，只留出一个接口 `map` 给容器外的函数
        * map一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数
        * 以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性
    * 理解
    ```
    // Container就是容器（有 value 就是容器 ）
    var Container = function(x) {
        this.__value = x; 
    }
    //函数式编程一般约定，函子有一个of方法
    Container.of = x => new Container(x);
    //Container.of(‘abcd’); 
    // 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。 
    Container.prototype.map = function(f){
        return Container.of(f(this.__value)) 
    }
    Container.of(3)
        .map(x => x + 1)    // 结果 Container(4)
        .map(x => 'Result is ' + x);    // 结果 Container('Result is 4')
    ```
    * Pointed函子
        * 函子只是一个实现了map契约的接口。`Ponited函子是 一个函子的子集`。
        * 生成新的函子的时候，用了new命令。这实在太不像函数式编程了，因为new命令是面向对象编程的标志。 `函数式编程一般约定，函子有一个of方法，用来生成新的容器。`
        * 
 11. 错误处理、Either、AP
 12. IO
 13. Monad




























