# EventLoop

- js 引擎执行异步代码而不用等待，是因有为有`消息队列`和`事件循环`。
  - `消息队列`：消息队列是一个先进先出的队列，它里面存放着各种消息。
              只要指定过回调函数，这些事件发生时就会进入`"任务队列(消息队列)"`，等待主线程读取。
  - `事件循环`：事件循环是指主线程重复从消息队列中取消息、执行的过程。

- `同步任务` 和 `异步任务`
  - `同步任务`指的是: 在`主线程上排队执行的任务`，只有前一个任务执行完毕，才能执行后一个任务
  - `异步任务`指的是: 不进入主线程、而进入`"任务队列"（task queue）`的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

- `异步执行`的运行机制
  - 所有`同步任务`都在主线程上执行，形成一个`执行栈（execution context stack）`。
  - 主线程之外，还存在一个`"任务队列"（task queue）`。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
  - 一旦`"执行栈"中的所有同步任务执行完毕`，`系统就会读取"任务队列"`，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
  - 主线程不断重复上面的第三步。
  - 注: `只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。`


### 浏览器中的 eventLoop
![浏览器中的 eventLoop](eventLoop1.png)
* 任务队列分类: 宏任务队列和微任务队列
![浏览器中的 eventLoop](eventLoop2.png)

1. 浏览器中的任务队列

   - 宏任务
     - `script`
     - `setTimeout`
     - `setInterval`
     - `requestAnimationFrame`
   - 微任务
     - `Promie(async)`
     - `MutationObserver`

2. 经典案例

   - 宏任务和微任务的执行顺序

     ```javascript
     // 宏任务队列: setTimeout
     // 微任务队列: Promise
     setTimeout(() => {
       console.log('setTimeout')
     }, 0)
     
     const promise = new Promise(resolve => {
       console.log('init');
       resolve(1);
       console.log('end');
     });
     
     promise.then(res => {
       console.log('result', res);
     })
     
     // 结果: 同步: init end 微任务: result 1 宏任务: setTimeout
     ```

   - 宏任务微任务交错执行

### nodeJS中的 eventLoop

1. 
2. 

