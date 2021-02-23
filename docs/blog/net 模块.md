# net 模块


## 基本概念
1. 信息的交互
    * `net`:  tcp 封装, 核心模块
    * `http`: tcp 层, 做了比较多的数据封装
    * 客户端与服务端通信: `socket` 和 `net.socket`
2. 组成
    * `net.server`: 内部通过 `socket` 实现, 实现与客户端通信。
    * `net.socket`: 实现全双工的stream接口。
3. `服务器`与`客户端`的交互:
    * 共性和差异: `server(服务端`) , `pipe 管道` , `client(客户端)`
    * `pipe 管道`建立: server监听端口, client访问端口

## 写个服务端与客户端交互的例子
1. net 方法 属性
2. 创建服务端, 分为以下3步: 
    * createServer
    * listen 端口 等待客户端的接入
    * socket data, close 完成客户端交互
3. 案例
    ```javascript
    // 文件 server.js

    const net = require("net");
    // 创建 tcp 服务
    const server = net.createServer();
    server.listen('8000');
    server.on('listening', function(){
        console.log('监听成功 监听端口是8000');
    })
    // 新的链接建立，会触发
    server.on('connection', socket => {
        console.log('有新的链接');
        server.on('data', data => {
            consoe.log('server 端收到 client 端的 data', data.toString());

            // 返回客户端数据
            socket.write('你好我是服务端');
            socket.write('客户端请关闭链接');
        })
        socket.close();
    })
    // 监听是否正常关闭
    server.on('close', ()=>{
        console.log("服务端断开链接");
    })
    ```
4. 客户端
    * 创建 socket
    * 链接指定的 ip 端口
    * 监听 data, close 完成与服务端交互
5. 案例
    ```javascript
    // 文件 client.js

    const net = require("net");   
    // 链接到服务端
    // localhost
    const netSocket = net.connect('8000');

    netSocket.on('error', () => {
        console.log('链接失败');
    })

    // 链接成功, 触发回调
    netSocket.on('connect', () => {
        console.log('客户端与服务端链接已经建立');
        netSocket.write('你好, 我是客户端');

        // 接收服务端数据
        netSocket.on('data', data => {
            console.log('客户端收到服务端的数据', data.toString());
            netSocket.end();
        })
    })

    netSocket.on("end", () => {
        console.log('客户端关闭链接成功');
    })
    ```


## net.server 类
1. `创建 server`: createServer
2. `listen()`: 监听端口。server.listen(端口号, ip)
3. `监听事件 on`:
    * `listening`: 当服务绑定后触发
    * `connection` 新的链接建立触发 socket
    * `close`
    * `error`
4. `方法`
    * `listen()`: 监听端口
    * `close()`: 关闭链接
    * `address()`: 返回绑定地址, 若listening事件没有被触发，则返回空对象。

## net.socket 类
1. `创建一个链接`: net.connect(端口, ip); 默认 localhost
2. `监听事件 on`
    * `connect`: socket链接成功触发
    * `data`: 接受到数据触发,  socket.setEncoding('utf8');
    * `end`: 关闭链接
    * `timeout`: 超时监听
    * `error`
3. 方法
    * `coonect()`: 监听链接
    * `write(写入内容)`: 要发送出去的内容, 默认编码utf8
    * `setTimeout`: 超时时长
4. 属性
    * `netSocket.localPort`: 访问本地端口
    * `netSocket.localAddress`: 返回本地地址
    * `remotePort`: 远程端口
    * `remoteAddress`: 远程地址













