# 小程序onPageNotFound的坑

1. `App.onPageNotFound`和`wx.onPageNotFound`用来`监听小程序要打开的页面不存在事件`。
2. 这里有一个坑就是，如果在小程序里面使用`wx.navigateTo`等路由Api进行页面跳转，如果页面不存在只会报错，并不会触发`onPageNotFound`。
3. `onPageNotFound`有一个`使用场景`就是，当`扫码登录的页面`不存在时可以重定向到另一个存在的页面。
    ```javascript
    App({
        onPageNotFound(res){
            wx.redirectTo({
                url: 'pages/index/index',
            })
        }
    })
    ```
4. 解决页面不存在, 跳转到另一个页面
    * `hock url`
   ```javascript

   ```


## 微信小程序路由
1. `wx.switchTab`:
    * `跳转到 tabBar 页面`，并关闭其他所有非 tabBar 页面
    * 在小程序插件中使用时，只能在当前插件的页面中调用
2. `wx.reLaunch`:
    * `关闭所有页面，打开到应用内的某个页面`
    * 在小程序插件中使用时，只能在当前插件的页面中调用
3. `wx.redirectTo(Object object)`:
    * 关闭当前页面，`跳转到应用内的某个页面`。但是不允许跳转到 tabbar 页面。
    * 在小程序插件中使用时，只能在当前插件的页面中调用
4. `wx.navigateTo(Object object)`
    * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
    * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
    * 在小程序插件中使用时，只能在当前插件的页面中调用
5. `wx.navigateBack(Object object)`
    * 关闭当前页面，返回上一页面或多级页面。
    * 可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
    * 在小程序插件中使用时，只能在当前插件的页面中调用







