# Function

1. 函数执行堆栈过程
    * 每调一次函数有一次压栈操作
    * 每次函数调用运行完，有一次出栈操作
    * 当栈为空，则所有的函数执行完成
    * 以上过程有助于理解递归

2. 函数提升 
    * JavaScript 解释器中存在一种变量声明被提升的机制，也就是说函数声明会被提升到作用域的最前面，即使写代码的时候是写在最后面，也还是会被提升至最前面。
    * 而用`函数表达式创建的函数是在运行时进行赋值`，且要等到表达式赋值完成后才能调用
    ```js
    var getName//变量被提升，此时为undefined   
        getName()//oaoafly 函数被提升 这里受函数声明的影响，虽然函数声明在最后可以被提升到最前面了
    var getName = function() {
        console.log('wscat')
    }//函数表达式此时才开始覆盖函数声明的定义
    getName()//wscat
    function getName() {
        console.log('oaoafly')
    }
    getName()//wscat 这里就执行了函数表达式的值
    ```
    * Javascript中`函数声明`和`函数表达式`是存在区别的，`函数声明`在`JS解析`时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而`函数表达式`的值是在JS`运行`时确定，并且在表达式赋值完成后，该函数才能调用。

3. js 作用域 
    * 函数作用域-静态-函数定义的时候，变量的访问就已经固定了
    * this 动态 谁调用this就是谁
    ```js
    inner = 'window';
    function say() {
        console.log(inner);
        console.log(this.inner);
    }
    var obj1 = (function() {
        var inner = '1-1';
        return {
            inner: '1-2',
            say: function() {
                console.log(inner);
                console.log(this.inner, this, 'obj1');
            }
        }

    })();
    var obj2 = (function() {
        var inner = '2-1';
        return {
            inner: '2-2',
            say: function() {
                console.log(inner);
                console.log(this.inner, this, 'obj2');
            }
        }

    })();
    say(); //  window   window
    obj1.say(); // '1-1' '1-2',
    obj2.say(); // '2-1' '2-2'
    obj1.say = say;
    obj1.say(); // window  1-2
    obj1.say = obj2.say;
    obj1.say(); // 2-1 1-2
    ```


4. 
