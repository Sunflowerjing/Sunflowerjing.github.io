# stream模块

## 流的基本概念
1. 流是数据传输的手段
2. 顺序: 起点(可读流)和终点(可写流)
3. 流: 逐段, 大文件, 大数据处理。(传统: 一次性读取完毕, 在处理)
4. 最基础流读取文件案例:
```javascript
// 文件模块
const fs = require('fs');
// 创建一个可读取的数据流
const rs = fs.createReadStream('data.txt');
let data = '';
// 监听数据传输, 数据逐块读取中的 块 chunk(buffer 二进制)
rs.on("data", chunk =>{
    data += chunk;
})
// 读取完成
rs.on("end", () =>{
    console.log(data);
})
```

## 为什么要用流
1. 优点: 内存效率，时间效率。
    * 大文件读写操作，拆分。逐块运输。
2. 确保读取和写入都能正常进行, 避免读取没完成，就已经写入了
    * `pinp()` 管道 
    * 案例
    ```javascript
    const fs = require('fs');
    const rs = fs.createReadStream('demo.mp4');
    const ws = fs.createWriteStream('copy.mp4');
    // pinp 只是可读流中的方法
    rs.pinp(ws);
    ```

## 流的类型
1. 四种类型的流:
    * 可读流: 
    * 可写流: 
    * Duplex: 双工流。`net.socket`(例如: 聊天系统，即可以发送消息也可以接受消息) 
    * transform: 转换流。(例如: 文件压缩的时候, 可以读取解压缩数据也可以写入解压缩数据) 
2. stream 对象: 都是EventEmitter的实例
    * data 事件:
    * end 事件:
    * error 事件:

## 如何使用
1. `可读流`
    * 两种模式
        * `flowing 模式`: data、rs,resume()、rs.pipe()
        * `paused 模式`: readable、rs.pause()
    ```javascript
        // 文件模块
        const fs = require('fs');
        // 创建一个可以读取数据流 默认为静态，监听事件才能触发流的流动
        const rs = fs.createReadStream("data.txt", {
        encoding: "utf8", // 显示字符串, 默认展示二进制
        highWaterMark: 6, // 设置缓冲区大小，默认大小16K, 单位byte字节
        });

        // 文件打开事件
        rs.on('open', () => {
            console.log("文件打开")
        })

        // 监听数据传输， 块 buffer 二进制
        // 不停进行数据读取，触发 data 事件
        // 设置一个缓冲区，大小默认16k, 若32k 则先读取16k 在读取16k, 设置的变量为 highWaterMark

        // 可读流: 两种模式 
        // chunk自动流动,flowing模式=>如下方式; 还有如下其他方式: data、rs,resume()、rs.pipe()
        // chunk手动流动,paused模式下=>stream.read(); 还有如下其他方式: readable、rs.pause()

        let data = '';
        // 监听 ondata, 为自动模式
        rs.on("data", chunk => { 
            data += chunk
        });

        // 监听 readable,  为手动模式
        rs.on("readable", () => { 
            while((chunk = rs.read()) != null) {
                data += chunk
            } 
        });

        // 读取完毕
        rs.on("end", () => {
            console.log('读取完毕', data);
        });
        // 读取错误
        rs.on('error', () => {
            console.log("读取错误")
        })
        // 文件关闭
        rs.on('clone', () => {
            console.log("文件关闭")
        })
    ```
2. `可写流`
    ```javascript
    const fs = require('fs');
    const ws = fs.createWriteStream('data2.txt');
    ws.on('open', () => {
        console.log("文件打开")
    })
    ws.write('我是write写入内容', 'utf8')
    // 标记文件末尾
    ws.end();
    ws.on("finish", () => {
        console.log('写入完成');
    });
    ws.on('error', () => {
        console.log("写入错误")
    })
    ws.on('clone', () => {
        console.log("文件关闭")
    })
    ```
3. `Duplex 可读可写 双工流` 继承: 可读流 + 可写流
    * 可以实现可读可写流的全部方法
    * read() write net.scoket
4. `transform stream 转换流` , 需要自己实现 transform。 继承Duplex
    ```javascript
    const stream = require("stream");
    const transform = stream.Transform({
        // 用户自己实现 transform 方法
        transform（chunk, encoding, cb){

            // 大小写字母转换, push 缓冲区
            this.push(chunk.toSting().toLowserCase());
            cb();
        }
        transform.write("D");
        console.log("转换成功", transform.read().toSting());

    })
    ```
5. `pipe()`
    * 可读流和可写流中搭建`管道`。
    * 目的: 可读与可写步调一致。保证读写速度，防止数据丢失。
6. `链式流`操作
    * 一般用于管道`(pipe())`操作
    ```javascript
    const fs = require('fs');
    const zilb = require('zilb');
    fs.createReadStream("./data.txt")
        .pipe(zilb.createGzip())
        .pipe(fs.createWriteStream("data.txt.gz"));
    console.log('finish');
    ```
7. `readLine` 
    * 逐行读取的最佳方案.(分析日志文件比较有用)
    ```javascript
    const fs = require('fs');
    const path = require('path');
    const readLine = require('readLine');
    const fileName = path.resolve(__dirname, "log.txt");

    const readStream = fs.createReadStream(fileName);

    let num = 0;

    // 创建一个 readLine 对象

    const readL = readLine.createInterface({
        // 输入
        input: readStream
    });

    readL.on("line", data => {
        if(data.indexOf("https://www1.com") != -1){
            num++
        }
        console.log(data);
    })

    readL.on("close", ()=>{
        console.log("读取完成", num);
    })
    ```

### Stream buffer 二进制 为什么使用二进制。
   1. I/O 谁都认识，效率高
   2. 数据格式未知，字符串 音频，网络包 asc编码，utf8编码




































