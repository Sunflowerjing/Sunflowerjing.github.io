# PHP基础

1. PHP 是块级作用域。
2. <?php 这里写 PHP 代码哦 ?>
3. PHP 的变量声明用 $
4. echo '输出'
5. 判断变量是否被声明了，`isset()`。例如：isset($a)。即变量定义了，才可以使用。
6. 函数中要使用外部的变量，则需要在函数中用`global`。例如：global $a;
7. 引入外部文件：`require_once`, `include_once`。区别：`include_once`有错误也要执行。
8. 关联数组：
```
$arrayTest = array('0' => '苹果', '1' => '橘子');
$arrayTest[0];
```
9. **session** 会话机制：浏览器不关闭情况下，在一个 PHP 页面注入 session，就可以在另一个页面获取到session。
```
// 注入 session
session_start();
$_SESSION['views']=1;


// 获取 session
session_start();
echo $_SESSION['views'];
```
10. 提交表单的简单形式：
```
<form action='b.php' method='get'>
    <label>用户名</label>
    <input type='text' name='username' />
    <label>密码</label>
    <input type='text' name='password' />
    <input type='submit' value='提交'/>
</form>

// 接受提交过来的数据
$_GET['username'];
```
11. Ajax 请求
```
$.ajax({
    url: 'a.php',
    data: {
        username: $('#username').val()
    },
    dataType: 'json',
    type: 'get',
    success: function(data){
        alert(data)
    },
    error: function(){
         alert('登录失败')
    }
})
```