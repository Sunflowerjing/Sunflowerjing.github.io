# HTTP 协议


1. 
2. 
3. 



## 输入网址后发生了什么
1. 谁发起第一次通信，谁就是客户端
2. 
3. 



## HTTP 协议详解


## 输入网址后发生了什么
1. www.baidu.com 回车
2. 找 IP
    * 为什么: 请求是需要经过**路由器**的转发, 到达服务器。但是路由器只识别32(IPV4)/64(IPV6)位地址
    * 怎么找: 
        * browser -> 联通DNS -> Root DNS(全量) 
        * 域名 和 IP, 以 MAP 的形式进行存储。{domain: 10.10.10.164} 
        * 此次没找到，去上一个 DNS 中找，找到后会缓存下来。
        * 浏览器先找本地缓存, 如果本地未找到, 则逐级查找 DNS 服务器。
3. 发请求
    * 谁去发: 浏览器。本质是 OS 里面的一个进程
    * 怎么发: 
        * client 和 server之间建立管道。`基于 ICP/IP 协议, 创建 socket 连接管道`
            * `Socket` 编程接口
            * CP/IP也必须对外提供编程接口，这就是Socket。
            * 不同语言都有对应的建立Socket服务端和客户端的库
            
        * 7层网络模型 OSI(Open System Interconnection)
            * 自`上往下`分为: 应用层、表示层、会话层、传输层、网络层、数据链路层和物理层。
            * HTTP 协议对应于应用层
            * TCP、UDP协议对应于传输层
            * IP协议对应于网络层
        * TCP/IP 怎么建立链接
            * 建立: 三次握手
            * 断开: 四次挥手
            ![输入网址后发生了什么](三次握手.jpeg)
            **第一次握手**：浏览器向服务器发送请求（SYN=1）,等待服务器确认 <br/>
            **第二次握手**：服务器收到请求并确认，回复一个指令（SYN=1，ACK=1）<br/>
            **第三次握手**：客户端收到服务器的回复指令，并返回确认（ACK=1）<br/>

            **服务器返回html文档之后，浏览器的渲染引擎开始dom解析过程**


            完成了三次握手，客户端和服务器端就可以开始传送数据。以上就是TCP三次握手的总体介绍。通信结束客户端和服务端就断开连接，需要经过四次分手确认。<br/>

            **第一次分手**：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；<br/>
            **第二次分手**：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；<br/>
            **第三次分手**：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；<br/>
            **第四次分手**：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。<br/>
        * HTTP 是什么？它和 TCP/IP 协议有什么不同
            * 他们都是协议, 但是工作在不同的网络层
            * 关于TCP/IP和HTTP协议的关系，“我们在传输数据时，可以只使用(传输层)TCP/IP协议，但是那样的话，如果没有应用层，便无法识别数据内容。如果想要使传输的数据有意义，则必须使用到应用层协议。应用层协议有很多，比如HTTP、FTP、TELNET等，也可以自己定义应用层协议。
4. 数据传输
    * client发送: request (path: /api/user. domain: www.baidu.com. Header session Cookie)
    * server 处理请求: 服务端处理逻辑
    * server 返回: response(header.body.Content-Type: html或application/json) 
5. 渲染
    * 服务器返回`html文档`之后，浏览器的渲染引擎开始`dom解析`过程
    * `构建DOM树`--> `渲染树(Render tree)` --> `布局render树`--> `绘制render树`
    * 构建DOM树
        * 渲染引擎会调用`html解析器`开始解析html，将html的标签`解析成dom树`，如果遇到静态资源，`link标签则去请求相应的资源`，遇到`script标签就会调用js引擎解释并执行`
        * 解析dom树的过程：通过网络请求获取的html网页或资源从`字节流解码成字符流`，然后通过词法分析器解析成词语，之后经过`语法分析器构建成节点`，最后这些`节点组成一颗dom树`（当dom树构建完成之后，`webkit会触发DOMContentLoaded事件`，jquery的dom ready源码实现也用到这个事件，当所有资源全都加载完毕之后会触发onload事件）
    * 渲染树(Render tree)
        * dom树解析完成之后，`渲染引擎`调用`css解释器`, 根据css规则为每个dom树节点计算css样式信息，`构建渲染树 (Render tree)`
        * render tree的过程：`渲染引擎调用css解释器`，根据css规则(解析外部或者内部引用额样式表)，解析出样式信息，构建render tree，渲染树会忽略掉不需要被渲染的元素(display:none,head,meta...)
    * 布局树（render layer）
        * 构建render tree之后，每个元素并不知道自己的大小颜色等样式和位置信息
        * 渲染引擎根据包含块和盒模型来计算元素的大小位置等信息，这就是布局计算（排版）。
    * 绘制render树
        * 绘制render树
6. 执行js、css



## HTTP 缓存机制

