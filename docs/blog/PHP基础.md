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
12. PHP 操作数据库`增删改查` 的小Demo
    ```
    <?php
        // 向客户端发送原始的 HTTP 报头
        header("Content-type:application/json; charset=utf-8"); 
        $servername = "127.0.0.1";  // 本地服务地址
        $username = "root";         // 用户名
        $password = "123456";       // 密码
        $dbname = "PHPTest";        // 数据库名
        
        // 创建连接
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // 检测连接
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        // 设置编码，防止中文乱码
        mysqli_query($conn , "set names utf8"); 

        // 插入数据
        // $sql = "INSERT INTO `news`( `newstitle`, `newimg`, `newcontent`) VALUES ('标题2222', '图片2222', '内容222222')";
       
        // 删除数据
        // $sql = "DELETE FROM `news` WHERE `newsid`=4";

        // 更新数据
        // $sql = "UPDATE `news` SET `newstitle`= '更改 title',`newcontent`= '更改内容' WHERE `newsid`=5";

        // 获取前端传给服务端的数据
        $newstitle = $_REQUEST['newstitle'];
        $newimg = $_REQUEST['newimg'];
        $newcontent = $_REQUEST['newcontent'];
        $addtime = $_REQUEST['addtime'];
        // $sql = "INSERT INTO `news`( `newstitle`, `newimg`, `newcontent`, `addtime`) VALUES ('$newstitle', '$newimg', '$newcontent', '$addtime')";
        
        // 查询数据
        $sql = "SELECT * FROM news";

        // 执行 SQL 语句
        $result = mysqli_query($conn, $sql);

        // 创建空数组
        $arr=array();
        
        // 关联数组 mysqli_fetch_assoc()
        while($row = mysqli_fetch_assoc($result)) {
            // 像数组中添加数据
            array_push($arr,array('newstitle'=>$row['newstitle'], 'newimg'=>$row['newimg']));
        }
        $res = array('errcode'=>0, 'result'=>$arr);
        echo json_encode($res);
    ?>
    ```
    * `$_GET` 变量接受所有以 get 方式发送的请求
    * `$_POST` 变量接受所有以 post 方式发送的请求
    * `$_REQUEST` 支持两种方式发送过来的请求

## PHP PDO
```
<?php
    $dbms='mysql';     //数据库类型
    $host='localhost'; //数据库主机名
    $dbName='PHPTest';    //使用的数据库
    $user='root';      //数据库连接用户名
    $pass='';          //对应的密码

    $dsn="$dbms:host=$host;dbname=$dbName";

    try{
        $dbh = new PDO($dsn, $user, $pass); //初始化一个PDO对象,连接到 MySQL
        echo "连接成功<br/>";
        // 进行一次搜索操作
        // 执行 SQL 语句
        foreach ($dbh->query('SELECT * from news') as $row) {
            print_r($row); //你可以用 echo($GLOBAL); 来看到这些值
        }
    // 现在运行完成，在此关闭连接    
    $dbh = null;
    }catch(PDOException $e){
        die ("Error!: " . $e->getMessage() . "<br/>");
    }
?>
```
* PDO::query — 执行 SQL 语句，返回PDOStatement对象,可以理解为结果集。
  `参数: 要执行的SQL语句`。
