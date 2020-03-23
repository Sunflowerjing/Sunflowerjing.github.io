# Linux

1. 操作 MAC 文件的显示和隐藏:
    * MAC显示隐藏文件: `defaults write com.apple.finder AppleShowAllFiles -bool true`
    * MAC不显示隐藏文件: `defaults write com.apple.finder AppleShowAllFiles -bool false`
    * 重启Finder：窗口左上角的苹果标志-->强制退出-->Finder-->重新启动





## Linux下的目录
* `0.0.0.0  允许所有 ip 连接。:: === 0.0.0.0, ::1===127.0.0.1`
首先要清楚几个目录:
```
/ : 根目录。进入根目录命令 cd /。
~ : 用户主目录的缩写。例如当前用户为hello，那么" ~ "展开来就是：/Users/hello。进入用户主目录命令 cd 或 cd ~。
. : 当前目录
..: 父目录
```
1. `/home`: `存放所有⽤户文件的根目录，是用户主目录的基点`。比如用户user的主目录就是/home/user，可以用~user表示。 执行`cd` 切换到当前用户目录下。`pwd`: 查看当前在哪个目录下。
```
比较重要的是，家目录有两种代号: 
    `~` : 代表当前使用者的家目录
    `~guest` :则代表用户名为guest的家目录。
```
2. `/root`: `超级用户(系统管理员)的主目录(特权阶级^o^)`。
3. `/bin`: `存放⼆进制可执⾏文件(ls,cat,mkdir等)，常⽤命令⼀般都在这里。`。 
4. `/boot`: `存放⽤于系统引导时使用的各种文件`。
5. `/dev`: `用于存放设备文件。`。
6. `/etc`: `存放系统管理和配置文件`。只有root有权力修改。
```
init.d: 放置服务启动脚本
rc. : 系统启动的时候做初始化
passwd: 定义当前操作系统下的所以用户
shadow: 保存的是口令, 用户的口令是加密的。
nginx: 
sysconfig: sysconfig/network-scripts: 此文件下面有如下类型网卡。ifcfg-ens23

在 Linux 下面访问 ip: 2种方式。ifconfig(需要安装) 和 ip addr。
lo: 对应的是local。127.0.0.1(ipv4) 本地回环地址
::1 是 ipv6,的127.0.0.1
/8(255.0.0.0),/128(FF::),/24(255.255.255.0) 是子网掩码
掩码(二进制 0 1)
计算机存储数据的最小单位为: 字节 byte
比字节更小的是bit: 1 byte = 8bit。 1个字节里面有8个二进制位
ipv4是4个byte = 32bit

查看此网卡的配置文件(ifcfg-ens23): cat ifcfg-ens23。
怎样固定 ip: 
保证网卡的配置文件中ONBOOT=yes, 
IPADDR=固定的IP地址, 
PREFIX=24(子网掩码), 
GATEWAY=192.168.8.2(网关 路由器), 
BOOTPROTO=none或static(默认) 若为dncp,则是动态获取。

修改ifcfg-ens23此文件: 输入vi /etc/sysconfig/network-scripts/ifcfg-ens23
按一下【i】进入编辑模式。
修改：
ONBOOT=“no”改为ONBOOT=”yes“
BOOTPROTO=”dhcp”，改为BOOTPROTO=“none”
末尾添加：
IPADDR=100.71.42.50
NETMASK=255.255.254.0
GATEWAY=100.71.42.1
//以上三行需要根据你自己第一步查询的ip和网关填写
//第一行：把你的ip地址的尾数改为其他数字（小于255），比如我把100.71.42.27改为了100.71.42.50
//第二行：填写你的子网掩码
//第三行：把你的ip地址的尾数改为1
按一下Esc键进入命令行模式，输入【：wq】敲回车，保存并退出
3.输入【service network restart】重启网络服务
4.输入【ifconfig eth0】检查设置是否正确
5.回到Windows下，在cmd窗口输入【ping 100.71.42.50】（改成你刚才设置的那个ip地址），如果出现下面的信息，说明配置成功。


ifup 网卡名: 激活网卡
ifdown 网卡名: 关闭网卡

127.0.0.1 和 0.0.0.0区别: 0.0.0.0是一种标记, 不是一种具体的 IP。
```
7. `/lib`: `存放跟文件系统中的程序运行所需要的共享库及内核模块`。
8. `/mnt`: 系统管理员安装临时⽂件系统的安装点，系统提供这个目录是让用户临时挂载其他的⽂件系统。
9. `/proc`: 虚拟目录
10. `/usr`: `⽤于存放系统应用程序，⽐较重要的⽬录/usr/local 本地系统管理员软件安装目录 (安装系统级的应用)。`这是最庞⼤的目录，要用到的应用程序和⽂件⼏乎都在这个目录。
11. `/opt`: `额外安装的可选应⽤程序包所放置的位置`。⼀般情况下，我们可以把tomcat等都安装到这里。
12. `/proc`: 虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息。
13. `/sbin`: `存放⼆进制可执行文件，只有root才能访问`。这里存放的是系统管理员使⽤的系统级别的管理命令和程序。如ifconfig等。
14. `/tmp`: `⽤于存放各种临时⽂件，是公用的临时⽂件存储点`。
15. `/var`: `用于存放运行时需要改变数据的⽂件，也是某些大文件的溢出区，`比方说各种服务的日志文件(系统启动⽇志)等。
16. `/lost+found`: 这个目录平时是空的，系统非正常关机而留下“⽆无家可归”的文件。


## Linux 架构体系
### Unix/Linx 的体系架构
![Unix/Linx 的体系架构](Linux体系架构.png)
![Unix/Linx 的体系架构](Linux架构图.png)

### 1.2 Linux 系统体系结构(核心系统)
1. 进程管理(Process)
2. 内存管理(Memory)
3. 文件系统(File systems)。 IO(Input和Output)相对于 CPU
4. 设备驱动(Device drivers)
5. 网络(Network)


## Linux 常用命令

### 命令基本格式
1. `top`: 查看当前进程的实时状态。退出: q。
    * 切换用户身份：`su`
    * root: 不要经常用超级管理员用户（最好普通用户登录，普通用户提权）
2. `ls`: 查询⽬录中的内容
    * ls [选项] [文件或者目录]
    * 选项
        * -a 显示所有⽂件，包括隐藏⽂件
        * -l 显示详细信息
        ```
        1 drwxr-xr-x . 1 root root 800 Sep 16 00:19 logs

        drwxr-xr-x : ⽂件类型和权
        . : ACL权限
        1 : 硬链接引用计数
        root : 所有者
        root : 所属组
        800 : 文件⼤小
        Sep 16 00:19 : 最后修改时间
        logs : 文件名
        ```
        * -d 查看目录本身的属性而⾮子文件 ls/etc/
        * -h ⼈性化的方式显示文件大小
        * -i 显示inode,也就是i节点，每个节点都有ID号
    * 默认当前目录下的⽂件列表
    * ⽂件类型和权限(drwxr-xr-x)
        * 第1位: `d是目录文件，l是链接文件(相当于 Windows 快捷方式==linux 软连接,连接文件指向路径)，- 是普通文件，p是管道`。 硬链接: 磁盘文件系统。
        * 第2-4位: 表示这个文件的属主拥有的权限，`r是读，w是写，x是执行`。（文件所有者， 文件所有者的用户组 ，其他用户） 三组
        * 第5-7位: 表示和这个文件属主所在同一个组的用户所具有的权限。
        * 第8-10位: 表示其他用户所具有的权限。
        ```
        rwx    111    7
        r-x    101    5
        rw-    110    6
        ```

### 文件处理命令        
1. `mkdir`: 创建目录
    * `mkdir -p [⽬录名]` (-p 递归创建)
2. `cd`: 切换目录
    * cd [⽬录]
    * ~ 家⽬录
    * 家目录
    * - 上次目录
    * . 当前目录
    * .. 上级目录
    * 相对路径是参照当前所在目录
    * 绝对路径是从根⽬录开始
    * 按TAB键可以补全命令和目录
3. `pwd`: 显示当前⽬录 pwd
4. `rmdir`: 删除⽬录
    * rmdir [⽬录名]
5. `rm`: 删除文件或者目录
    * rm [⽂件或者目录]
        * -r 删除⽬录
        * -f 强制删除
    * rm -rf [⽂件或者⽬录] 递归强制删除所有目录
6. `cp`: copy 复制命令
    * copy [源⽂件或者目录] [目标文件]
        * -r 复制目录,默认是复制文件
        * -p 连带文件属性复制
        * -d 若源文件是链接⽂文件，则复制连接属性 
        * -a 相当于 -rpd
7. `mv`: 移动文件或者改名 move
    * mv [源文件或者目录] [⽬标文件]
8. `ln`: 链接命令,生成链接文件 link
    * 硬链接特征
        * 拥有相同的i节点和存储block块，可以看作是同一个文件
        * 可以通过i节点访问
        * 不能跨分区
        * 不能针对目录使用
        * 一般不使用
    * 软链接特征
        * ln -s [源⽂件] [⽬标文件]
            * -s 创建软链接
        * 类似Windows快捷方式
        * 软链接拥有自己的i节点和Block块，但是数据块中只保存源⽂件的文件名和i节点号，并没有实际的⽂件数据。
        * rwxrwxrwx 软链接 软链接的文件权限都是 777
        * 修改任意⼀个文件，另一个都会改变
        * 删除源⽂件，软链接不能使用
        * 软链接源文件必须写绝对路径

### ⽂件搜索命令
1. `locate`: 
    * 在后台数据库中按文件名搜索，速度比较快
    * 数据保存在 `/var/lib/mlocate` 后台数据库，每天更新一次
    * 可以 `updatedb` 命令立刻更新数据库
    * 只能搜索文件名 `/etc/updatedb.conf`
    * 建立索引的配置文件
        * PRUNE_BIND_MOUNTS = "yes" 全部生效，开启搜索限制
        * PRUNEFS 不搜索的文件系统
        * PRUNENAMES 忽略的⽂件类型
        * PRUNEPATHS 忽略的路径 `/tmp`
2. `whereis`:
    * 搜索命令所在路径以及帮助文档所在位置
    * whereis 命令名 `whereis ls`
    * -b 只查找可执行⽂件
    * -m 只查找帮助文件
3. `which`:
    * 可以看到别名 `which ls`
    * 能看到的都是外部安装的命令
    * ⽆法查看Shell⾃带的命令，如 `which cd`
4. 环境变量: `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`
    * 定义的是系统搜索命令的路径
    * `echo $PATH`
5. `find`:
    * ⽂件搜索命令
    * find [搜索范围] [搜索条件]
    (1) 按名称搜索
        * 避免大范围的搜索，会非常消耗系统资源
        * `find/-nameaaa.log`
    (2) 通配符
        * find是在系统当中搜索符合条件的文件名，如果需要匹配，使⽤通配符匹配，通配符是完全匹配
        * 通配符
            * `*` 匹配任意内容
            * `?` 匹配任意一个字符
            * `[]` 匹配任意⼀个中括号内的字符
            * `find . -name "ab[cdef]"`
    (3) `-i`
        * 不区分⼤小写
        * `find  -iname A.log`
    (4) `-user`
        * 按所有者进行搜索
        ```
        find /root -user root 
        find /root -nouser
        ```
    (5) `按时间搜索`
        `find /nginx/access.log -mtime +5`

    |  参数     |     含义     |
    |  ----    |     ----      |
    | atime    |	⽂件访问时间 |
    | ctime    |	改变文件属性 |
    | mtime    |	修改文件内容 |

    |  参数     |     含义     |
    |  ----    |     ----      |
    | -5    |	5天内修改的文件 |
    | 5     |	5天前当前修改的文件 |
    | +5    |	5天前修改的文件 |

    (6) `按大小搜索`
        * k小写,M大写
        * find . -size 100k

    |  参数     |     含义     |
    |  ----    |     ----      |
    | -8k      |	⼩于8K      |
    | 8k       |	等于8K |
    | +8k      |	⼤大于8K |
    (7) `按i节点搜索`: `find . -inum 123456`
    (8) `综合应⽤`: `find /tmp -size +10k -a -size -20k`
        * 查找 `/etc` 目录下，⼤于10KB并且⼩于20KB的文件
        * `-a and` 逻辑与，两个条件都满⾜
        * `-o or` 逻辑或，两个条件满足⼀个就可以
        `find /tmp -size +10k -a -size -20k -exec ls -lh {} \;`
        * `exec` 对上个命令的结果进行操作
    (9) `grep`
        * 在⽂件当中匹配符合条件的字符串
        * grep "10" access.log
            * `-i` 忽略大⼩写
            * `-v` 排除指定字符串
        * `find`命令，在系统当中搜索符合条件的文件名，如果需要匹配，使⽤通配符匹配，通配符是完全匹配
        * grep命令 在文件当中搜索符合条件的字符串，如果需要匹配，使⽤正则表达式进⾏匹配，正则表达式包含匹配

### 帮助命令
1. 基本⽤法
    * `man` 命令 获取指定命令的帮助
    * `man ls` 查看ls的帮助
    ```
    man -f ls 
    whatis ls 
    man 1 ls 
    man 1p ls
    ```
2. 关键字搜索: `- man -k passwd`
3. `shell 内部帮助`: `where is`
    * 找到就是外部，找不到就是内部: `help cd`

### 压缩与解压缩命令
1. `.zip .gz .bz2 .tar.gz .tar.bz2`
2.  `zip格式`
    * 压缩文件: `zip 压缩⽂件名 源文件`
    * 压缩目录: `zip -r 压缩⽂文件名 源目录`
    * 解压 unzip 压缩文件名
    ```
    mkdir book
    touch book/1.txt 
    touch book/2.txt 
    zip -r book.zip book 
    unzip book.zip
    ```
3. `gzip`

|  命令                         |     示例                      |     含义     |
|  ----                        |     ----                      |         ----             |
| gzip 源⽂件                   |	gzip a.txt                  |	压缩为.gz格式的压缩文件，源⽂件会消失 |
| gzip -c 源文件 > 压缩文件      |	gzip -c yum.txt > yum.txt.gz  |	压缩为.gz格式的压缩⽂件，源⽂件不会消失 |
| gzip -r ⽬录                 |	gzip -r xx                  |	压缩⽬录下的所有⼦⽂件，但是不压缩目录 |
| gzip -d 压缩文件名            |	gzip -d yum.txt.gz           |	解压缩⽂件,不保留压缩包 |
| gunzip 压缩文件               |	gunzip yum.txt.gz            |	解压缩文件,不保留压缩包 |
* 压缩是压缩⽬录下的文件

4. ` .bz2格式压缩`

|  命令                         |     示例                      |           含义            |
|  ----                        |     ----                      |         ----             |
| bzip2 源文件                  |   bzip2 1.txt                 |	压缩为.bz2格式的文件，不保留源文件 |
| bzip2 -k 源⽂件               |	zip2 -k 1.txt               |	压缩为.bz2格式的⽂件，保留源文件 |
| bzip2 -d 压缩⽂件名            |	 bzip2 -d 1.txt.bz2          |	 解压压缩包   |
| bunzip2 压缩⽂件名             |	 bunzip2 1.txt.bz2           |	解压压缩包 |
* bzip2 不能压缩⽬录

5. `tar`
    * 打包命令
    * `tar -cvf` 打包文件名 源文件
        * -c 打包
        * -v 显示过程
        * -f 指定打包后的文件名
        ```
        tar -cvf book.tar book 
        gzip book.tar
        bzip2 book.tar
        ```
    * x 解打包: `tar -xvf book.tar`
6. `压缩格式`
    * 压缩:
    > tar –cvf jpg.tar *.jpg //将⽬目录⾥里里所有jpg⽂文件打包成tar.jpg tar –czf jpg.tar.gz *.jpg //将⽬目录⾥里里所 有jpg⽂文件打包成jpg.tar后，并且将其⽤用gzip压缩，⽣生成⼀一个gzip压缩过的包，命名为jpg.tar.gz tar –cjf jpg.tar.bz2 *.jpg //将⽬目录⾥里里所有jpg⽂文件打包成jpg.tar后，并且将其⽤用bzip2压缩，⽣生成⼀一 个bzip2压缩过的包，命名为jpg.tar.bz2 tar –cZf jpg.tar.Z *.jpg //将⽬目录⾥里里所有jpg⽂文件打包成 jpg.tar后，并且将其⽤用compress压缩，⽣生成⼀一个umcompress压缩过的包，命名为jpg.tar.Z rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux zip jpg.zip *.jpg //zip格式的压缩，需 要先下载zip for linux
    * 解压:
    > tar –xvf file.tar //解压 tar包 tar -xzvf file.tar.gz //解压tar.gz tar -xjvf file.tar.bz2 //解压 tar.bz2 tar –xZvf file.tar.Z //解压tar.Z unrar e file.rar //解压rar unzip file.zip //解压zip

### 关机和重启命令
1. `shutdown`: 
    * shutdown 关机命令:
        * -c 取消前⼀个关机命令 
        * -h 关机
        * -r 重启
        ```
        shutdown -r 06:00 
        shutdown -c
        ```
2. `init`:
    * 关机: `init 0`
    * 重启: `init 6`
    * 系统的运⾏级别
        * 0 关机
        * 1 单⽤户
        * 2 不完全多⽤户，不包含NFS服务
        * 3 完全多⽤户
        * 4 未分配
        * 5 图形界⾯
        * 6 重启
3. `logout`
    * 退出登录: `logout`

###  查看登录用户信息
1. `w`:
    * 查看登录⽤户信息
        * USER 登录的用户名
        * TTY 登录的终端 tty1 本地终端 pts/0 远程终端
        * FROM 登录的IP
        * LOGIN 登录时间
        * IDLE ⽤户闲置时间
        * JCPU 该终端所有进程占用的时间
        * PCPU 当前进程所占⽤的时间
        * WHAT 正在执⾏的命令
2. `who`:
    * 查看登录⽤户信息
        * USER 登录的用户名
        * TTY 登录的终端 tty1 本地终端 pts/0远程终端
        * LOGIN 登录时间(登录的IP)
3. `last`: 
    * 查看当前登录和过去登录的⽤户信息 默认读取 `/var/log/wtmp` ⽂件
        * ⽤户名
        * 登录终端
        * 登录IP
        * 登录时间
        * 退出时间(在线时间)
4. `lastlog`: 
    * 查看所有用户的最后⼀次登录时间
        * 用户名
        * 登录终端
        * 登录IP
        * 最后⼀次登录时间

## shell
* shell是⼀个命令行解释器，它为⽤户提供了⼀个向Linux内核发送请求以便运行程序的界面系统级程序
* 用户可以⽤Shell来启动、挂起、停⽌止或者编写⼀些程序 
* Shell还是⼀一个功能相当强⼤的编程语言，易编写，易调试，灵活性较强。 
* Shell是解释执行的脚本语言，在Shell中可以直接调用Linux系统命令。
1. 查看支持的shell: `/etc/shells`
2. `echo`: 
    * 输出命令
    * `--e` 支持反斜线控制的字符转换

    |  参数     |     含义     |
    |  ----    |     ----      |
    | atime    |	⽂件访问时间 |
    | ctime    |	改变文件属性 |
    | mtime    |	修改文件内容 |
3. 编写执行shell



## vi 编辑器
1. VI visual interface
2. 可视化接口 
3. 类似与windows中的记事本 
4. vim⽀持多级撤销
5. 跨平台
6. 语法⾼亮
7. ⽀持图形界面
8. 操作模式 
    * :w 保存
    * :q 退出
    * :! 强制保存
    * :ls 列出所有的文件
    * :n 下⼀一个
    * :N 上⼀一个
    * :15 跳转到指定行
    * /xxx 从光标位置开始向后搜索 xxx 字符串
    * ?xxx 从光标位置开始向前搜索


## 用户和用户组


## ⽤户操作


## ⽤户命令











