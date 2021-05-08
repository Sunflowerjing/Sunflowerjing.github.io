# CSS常见问题

* BFC就是块级的作用域。GFC就是grid作用域。IFC就是内联作用域。FFC就是flex作用域




什么是BFC， 怎么创建BFC， BFC解决了哪些问题？
BFC指的是独立渲染区域

创建bfc的方式：
1. float不是none
2. position不是relative和static
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow不是visible

BFC能解决哪些问题
1. 边距重叠问题
2. 盒子塌陷问题
3. 清除浮动
4. 浮动环绕文字问题