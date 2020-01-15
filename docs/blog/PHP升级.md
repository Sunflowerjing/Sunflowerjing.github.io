# PHP升级

## 面向对象介绍
* `软件危机`是指落后的软件生成方式无法满足迅速增长的计算机软件需求。
* 软件工程学: 分为`结构化方法`和`面向对象`。结构化方法(按软件周期分为三个阶段: `分析`、`设计`和`编程`)。
* `OOP: 面向对象编程`。其编程的代码更简洁、更易于维护,并具有更强的可重用性。
* OOP 达到了软件工程的三个目标: `重用性`、`灵活性`、`扩展性`。
* OOP 面向对象编程的三个特点: `封装`、`多态`、`继承`。

## 类 和 对象
* 类: 大的范围。例如: 人类。
* 对象: 具体到某一个实体。例如: 张三。
* `类`是内置的构造函数，`对象`就是实例。`对象是，构造函数 new 出来的`(JavaScript)。
* 面向对象的三个主要特性：
    * 行为: 方法
    * 状态: 属性
    * 标识: 姓名。例如: var s = new Object。其中 s 就是一个标识。

## PHP类的格式
1. 简单的格式
```
[修饰符] class 类名 {  // 使用 class 关键字加空格后加类名
    [成员属性] // 也叫成员变量
    [成员方法] // 也叫成员函数
} 
```
2. 完整的格式
```
[修饰符] class 类名 [extends 父类][implements 接口1[, 接口2...]] {
    [成员属性] // 也叫成员变量
    [成员方法] // 也叫成员函数
} 
```
3. 成员属性
* 格式: `修饰符 $变量名[=默认值]; `  // 例如: public $name='小明';
* 注意: 成员属性`不可以`是`带运算符的表达式`、`变量`、`方法或函数`调用。
* 错误格式:
```
public $var1 = 1+2;
public $var2 = self::myStaticMethod();
public $var3 = $myVar;
```
* 正确定义方式:
```
public $var1 = 100; // 普通数值 (4个标量: 整数、浮点数、布尔、字符串)
public $var2 = myConstant;  // 常量
public $var3 = self::myStaticMethod;  // 静态属性
public $var4 = array(true, false);  //  数组
```
4. 成员方法
* 格式:
```
[修饰符] function 方法名(参数..){
    [方法体]
    [return 返回值]
}
```
* 例子:
```
public function say(){ // 人可以说话的方法哦
    echo '人在说话'; // 方法体
}
```
5. 实例化对象
* 使用 new 关键字来生成一个对象。
* `$对象名称 = new 类名称();`
* `$对象名称 = new 类名称([参数列表]);`

6. 对象中成员的访问
* `$引用名 = new 类名(构造参数);`
* `$引用名->成员属性 = 赋值;   //对象属性赋值`
* `echo $引用名->成员属性;    //输出对象的属性`
* `$引用名->成员方法(参数);   //调用对象的方法`  

7. 特殊对象的引用 $this
```
<?php
    class Person{
        public $age;
        public function say($word){
            echo '我说了什么? '.$word;
        }
        public function info(){
            $this->say('哈哈哈');  // 需要注意的是,调用成员方法或者属性的时候不要用$。
            return $this->age;
        }
    }
    $o = new Person();
    $o->age = 20;
    // $o->say();
    $result = $o->info();
    echo '<br />';
    echo $result;
?>
```
## 构造方法和析构方法
* 两个下划线 `__`, 表示私有的方法。
1. 构造方法

* 构造方法: 在类声明的时候被执行。`即: 当这个类 new 的时候自动执行`
* 构造方法的语法格式:
```
[修饰符] function __construct([参数]){
    程序体
}    
```

2. 析构方法
* 析构方法: 下面在没有此类方法调用的时候，就会执行析构方法。`即: 对象被销毁的时候执行, 没有代码在去运行了`
* 用途: 可以进行资源的释放操作,例如: 数据库的关闭。
* 析构方法的语法格式:
```
[修饰符] function __destruct([参数]){
    程序体
}   
```

## PHP 面向对象封装性

1. 设置私有成员与私有成员的访问。
    * 封装的修饰符: `public(公有的,默认)`、`private(私有的)`、`protected(受保护的)`
    * 设置私有成员
    * 访问私有成员: `私有的成员方法,不能在类的外部直接访问`。只能在对象的内部方法中使用`$this`访问。
2. 以下几个魔术方法, 只针对`private、protected`修饰的变量生效。
    * 魔术方法 __set(); `当外面的元素，对类里面的元素进行设置值的时候，会自动调用。`
    * 魔术方法 __get();`取这个元素的时候会自动调用`
    * 魔术方法 __isset();  `对类里面成员属性进行判断的时候调用`。属性是public修饰的话,为 true。属性是private、protected修饰的话,为 false。
    * 魔术方法 __unset();  `从类外释放属性的时候进行调用`
    ```
    <?php
        class Person{
            private $is='我存在啊';
            private $name = 'jingjing';
            private $age = 28;
            protected $many = 200;

            private function getAge(){
                return $this->age;
            }

            private function getMany(){
                return $this->many;
            }

            public function user(){
                echo $this->$is.'===='.$this->name.'======'.$this->getAge().'====='.$this->getMany();
            }
            public function __set($key,$value){
                echo $key.'-------'.$value.'<br/>';
                if($key ==='name' && $value === '小红'){
                    echo '要修改了<br/>';
                    $this->name='小红';
                }
            }
            public function __get($key){
                if($key === 'age'){
                    return '不想告诉你我的年龄==='.$this->age.'<br/>';
                }
            }
            public function __isset($key){
                if($key === 'is'){
                    return false;
                }
            }
            public function __unset($key){
                echo '<br/> 调用__unset()方法';
                if($key === 'is'){
                    unset($this->is);
                }
            }
        }
        $p = new Person();
        $p->name='小红';   // 调用__set()方法
        echo $p->age;     // 调用__get()方法
        var_dump(isset($p->is)); // 调用__isset()方法
        unset($p->is);  // 调用__unset()方法
        echo $p->is;  // 没有输出的原因是,私有属性。可以调用__get()方法
        $p->user();  // $this->$is报错。别的属性正常输出。
    ?>
    ```
    * 正常情况下, 在外面调用私有属性、私有方法会报错。
    * 若要修改私有属性，则调用`__set()`方法。
    * 若外部输出私有属性，则调用`__get()`方法。
3. 封装性: 就是把对象中的`成员属性`和`成员方法`加上访问修饰符,使其尽可能`隐藏对象的内部细节`,以达到对成员的`访问控制(切记不是拒绝访问)`。
4. 


