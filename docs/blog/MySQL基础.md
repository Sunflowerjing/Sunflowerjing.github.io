# MySQL基础

## 安装 MySQL

1. 下载地址：<a 
                href='https://dev.mysql.com/downloads/mysql/'
                target='_blank'
            >https://dev.mysql.com/downloads/mysql/
                 </a>
           
2. 选择如下
![安装 MySQL img](安装MySQL-image1.png)
3. 点击进去后,进行下载
![安装 MySQL img](安装MySQL-image2.png)
4. 然后傻瓜式安装就可以了，一直点击到下一步进行完成。
5. 安装成功后会在系统偏好设置中，显示此图标
![安装 MySQL img](安装MySQL-image3.png)
6. 点击后界面如下
![安装 MySQL img](安装MySQL-image4.png)
![安装 MySQL img](安装MySQL-image5.png)
7. MySQL 相关命令
- 查看mysql的服务进程`ps -ef|grep mysql `。
- 如果没有启动就执行下面命令启动 `/etc/init.d/mysqld start`。

## 终端连接MySQL
1.修改环境变量
- 目的：想直接从cmd命令提示框中直接运行, `mysql -u root -p`, 若不修改则报错`command not found: mysql`。
- 需要注意：`item`和`默认终端`的配置环境变量的地方是不一样的。
    - item: 操作的命令是`vim .zshrc`
    - 默认终端: 操作的命令是`vim .bash_profile` 
    - 按`i`进入编辑模式, 需要在文件中添加 `PATH=$PATH:/usr/local/mysql/bin/`, 按`esc`退出编辑模式,   然后按`:wq`进行保存退出。
    - 若修改后，使当前环境立马生效的命令。需要执行`source .zshrc` 或者 `source .bash_profile`
2. 然后通过以下命令登陆MySQL（密码一般为 root）`mysql -u root -p`
3. 登录成功的界面是
![终端连接MySQL](终端连接MySQL-image1.png)
4. 退出MySQL，则用`exit` 或者`quit`退出mysql。强制退出:q!

- `~/.bash_profile`介绍：该文件包含专用于你的bash shell的bash信息，当登录时以及每次打开新的shell时，该文件被读取.（每个用户都有一个.bashrc文件，在用户目录下）使用注意：需要需要重启才会生效，/etc/profile对所有用户生效，~/.bash_profile只对当前用户生效。

5. Telnet ip prot: 用于远程登录，查看是否允许远程登录
6. 

## MySQL 常见命令
1. `show databases;`查看多少个数据库,database后面带"s"。
2. `use "数据库名"` 使用该数据库
3. `show tables;` 查看当前库下有哪些表
4. `create database 数据库名;`新建数据库
5. 基础增删改查操作命令
    * `INSERT INTO 表名 ( field1, field2,...fieldN ) VALUES ( value1, value2,...valueN );` 插入数据
    * `SELECT * FROM 表名 WHERE 条件(id=1);` 查询表中，符合条件(即id等于1)的数据
    * `UPDATE 表名 SET key=value WHERE  条件;`  更新符合条件的数据
    * `DELETE FROM 表名 WHERE 条件;`  删除符合条件的数据

- MAC上的MySQL管理工具 Sequel Pro
![MySQL 常见命令](MySQL操作表的常见命令-image1.png)
- `desc 表名; `: 查询某表中的包含哪些字段

## MySql 踩过的坑
* phpMyAdmin 尝试连接到 MySQL 服务器，但服务器拒绝连接。
    * 首先检查配置文件中的`主机`、`用户名`和`密码`。
    * 其次，要把本地安装的 MySQL 关闭。在系统偏好里面，点进小海豹图标，点击`Stop MySQL Server`，停止服务。
    * 点击下图第二个按钮, 即可进入`xamppfiles`此文件夹。
    ![MySql 踩过的坑](MySql踩过的坑-image1.png)
    * 然后找到安装目录，`xamppfiles/phpmyadmin/config.inc.php`。
    * 然后修改此文件。执行：`vim config.inc.php`。
    * 更改信息如下：
        ```
        $cfg['Servers'][$i]['host'] = '127.0.0.1';
        $cfg['Servers'][$i]['port'] = '3306';
        $cfg['Servers'][$i]['user'] = '这里填写用户名(一般为 root)';
        $cfg['Servers'][$i]['password'] = '这里填写你的MySQL密码(12345678)';
        $cfg['Servers'][$i]['AllowNoPassword'] = true;
        ```
    







