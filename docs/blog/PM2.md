# PM2

* PM2是一个带有 `负载均衡` 功能的Node应用的进程管理器。
* PM2可以利用服务器上的`所有CPU`，并保证进程永远都活着，`0秒的重载`，部署管理`多个Node项目`。

1. 基本指令
    * 全局安装: `npm install -g pm2@latest`(@latest表示安装最新的版本)
    * 启动服务，入口文件是app.js: `pm2 start app.js`
    * 为一个服务指定名字: `pm2 start app.js --name order`
    * 列出所有进程状态
        * `pm2 list`
        * 列出未经加工的JSON数据（进程信息）: `pm2 jlist`
        * 优雅的列出JSON数据（进程信息）: `pm2 prettylist`
        * 展示一个进程的详细信息: `pm2 describe（show）  order`
        * 监听所有进程信息: `pm2 monit`
        * 重新加载所有日志: `pm2 reloadLogs`
    * 日志显示:
        * 显示所有进程的日志: `pm2 logs`
        * 显示指定进程的日志: `pm2 logs  order`
        * 清空所有日志文件: `pm2 flush`
    * 进程操作:
        * 停止所有进程: `pm2 stop all`
        * 根据进程名停止进程: `pm2 stop order` 
        * 重启所有进程: `pm2 restart all`
        * 从pm2列表里面删除全部进程: `pm2 delete all`
        * 根据进程名删除进程: `pm2 delete order`
        * 0秒停机重载进程 (用于 NETWORKED 进程): `pm2 reload all`
        * 优雅的重载所有的进程，首先发送退出消息，然后重载: `pm2 gracefulReload all`
    * 重启服务: `npm restart  [name or id]`
    * 与rastart功能相同，但是可以实现0s的无缝衔接。如果有nginx的使用经验，可以对比`nginx reload`指令: `npm reload  [name or id]`
    * 当内存超过1024M时自动重启。 如果工程中有比较棘手的内存泄露问题，这个算是一个折中方案: `pm2 start app.js --max_memory_restart 1024M`
