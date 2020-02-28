# NodeJS基础API


## Node.js回调机制
什么是回调:
* 函数调用方式分为3类: `同步调用、回调和异步调用`。
* `同步调用`: 直接对某一个函数调用。
* `回调`: 是一种双向调用模式。被调用的一个函数, 在被调用时也会`返过来调用它的主调函数`, 这种情况就叫做回调。
* `异步调用`: 类似消息或者事件的一种机制。
* 通过`回调函数`来实现回调。

## 阻塞和非阻塞
* 阻塞和非阻塞: 关注的是程序在运行当中等待调用的结果, 在等待的时候程序有一种状态, 这种状态就是阻塞或者是非阻塞状态。
* 阻塞(同步): 当调用一个函数的时候, 需要`等待`这个函数返回一个值。
* 非阻塞(异步): 当调用一个函数的时候, 不需要等待这个函数的结果。而继续向下执行其他代码。
* 阻塞代码(同步读取文件):
```
const fs = require('fs');
cosnt data = fs.readFileSync('data.txt');
console.log(data.toString());
```
* 非阻塞代码(异步读取文件):
```
const fs = require('fs');
cosnt data = fs.readFile('data.txt', function(err, data){
    if(err){
        return console.err(err);
    }
    console.log(data.toString());
});
console.log('程序执行完毕');
```


























