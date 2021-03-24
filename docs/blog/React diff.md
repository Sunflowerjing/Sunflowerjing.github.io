# React diff


## 传统 diff 算法
1. 通过`循环递归`对节点进行依次对比.



## React diff 算法
1. react 的 diff 有3种
    * `Tree Diff`: Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计
    * `Component Diff`: 
        * 拥有`相同类`的俩个组件将会生成相似的树形结构
        * 拥有`不同类`的俩个组件将会生成不同的树形结构
    * `Element Diff`: 





