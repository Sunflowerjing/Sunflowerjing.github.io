# MongoDB


## 数据库操作
1. 通过 shell 链接 MongoDB 服务执行:
    > `mongo`
2. MongoDB命令查询所属数据库表: 
    > `show dbs`
3. 查看当前连接在哪个数据库下面: 
    > `db`
4. 切换到某数据库下面: 
    > `use yapi(数据库名称)`
5. 查看某数据库下有哪些表或者叫collection: 
    > `show collections` 或 `db.getCollectionNames()获取当前数据库的表名`
6. 想知道mongodb支持哪些命令，可以直接输入: 
    > `help`
7. 想知道当前数据库支持哪些方法: `db.help()`


## 表操作

1. 查看test库中的表: 
    > `show collections`
2. 删除user表:
    > `db.user.drop();`
3. 查看 yapi 数据库, 下面的 project 表内容: 
    > 1. 全部查找: `db.project.find()`
    > 2. 按条件查找: `db.project.find({'id': 10010})`
    > 3. 数据格式化显示: `db.project.find({'id': 10010}).pretty()`
    > 4. 只查询一条数据,使用findOne(): `db.表名.findOne()`
    > 5. 查询条件:
        >> 1. $lt 小于 例如{"age": {$lt:30}}
        >> 2. $lte 小于或等于 例如 {"age": {$lte: 30}}
        >> 3. $gt 大于 例如{"age": {$gt: 30}}
        >> 4. $gte 大于或等于
        >> 5. $ne 不等于
   
4. 查询表中一共有多少条数据:
    > `db.表名.count()`
5. 想知道当前数据库下的表或者表collection支持哪些方法: `db.表名.help()`。 user 表名
6. 删除表: `db.表名.drop()`


## 超级用户相关
1. 增加或修改用户密码:
    >  `db.addUser('admin','pwd')`  
2. 查看用户列表:
    > `db.system.users.find()`
3. 用户认证:
    > `db.auth('admin','pwd')`
4. 删除用户:
    > `db.removeUser('mongodb')`
5. 查看所有用户:
    > `show users`
6. 查看所有数据库:
    > `show dbs`
7. 查看所有的collection 
    > `show collections`
8. 查看各collection的状态 
    > ` db.printCollectionStats()`   
9. 客户端连接  
    > `/usr/local/mongodb/bin/mongo user_addr -u user -p 'pwd' ` 
10. 查找所有:
    > `db.foo.find()`
11. 查找一条记录:
    > `db.foo.findOne()`
12. 根据条件检索10条记录  
    > `db.foo.find({'msg':'Hello 1'}).limit(10)`
13. sort排序
    > 1. `db.deliver_status.find({'From':'yushunzhi@sohu.com'}).sort({'Dt',-1})`
    > 2. `db.deliver_status.find().sort({'Ct':-1}).limit(1)`
14. count操作:
    > `db.user_addr.count()`
15. 只取表中 msg 不一样的数据, 相同的只展示一个:
    > `db.foo.distinct('msg')`
16. 查看表数据的大小:
    > `db.表名.dataSize() `
17. 查看colleciont状态:
    > `db.表名.stats()`  


## 问题总结
1. mongodb 使用 group 查表出错(`db.group.find()`):
    > 1. 解决办法: `db.getCollection("group").find()`.
    > 2. 原因: `group` 在 `mongodb` 属于保留字段，当出现时 `mongodb` 会有另外的意义







