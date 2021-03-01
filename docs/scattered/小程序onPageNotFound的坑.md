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
    // 由于优化公共包 size. url变化较多, 则建立文件做了 url 映射。
    const URL_MAP = {
        '/pages/ppTrip/focusWechat/index': '/pages/tripP/focusWechat/index',
    }

    function getNameSpace(){
        // 这样写的原因的是, 各小程序中引入其他小程序环境变量报错, 不得不这样写
        try { return wx; } catch (e) {}
        try { return swan; } catch (e) {}
        try { return my; } catch (e) {}
        try { return tt; } catch (e) {}
    }
    const miniRouterFn = ['reLaunch', 'redirectTo', 'navigateTo'];
    const quickRouterFn = ['push', 'replace', 'back'];
    if (getNameSpace()){ // 小程序
        miniRouterFn.forEach(function (hook) {
            const old = getNameSpace()[hook];
            Object.defineProperty(getNameSpace(), hook, {
                value: function(params){
                    const url = params.url;
                    let newParams = params;
                    if (URL_MAP[url]){
                        newParams = Object.assign(params, {url: URL_MAP[url]});
                    }
                    old(newParams);
                }
            });
        });
    } else if (process.env.ANU_ENV === 'quick') { // 快应用
        const router = require('@system.router');
        quickRouterFn.forEach(function (hook) {
            const old = router[hook];
            const quickParams = (hook === 'back') ?  'path' : 'uri';
            Object.defineProperty(router, hook, {
                value: function(params){
                    const url = params.url;
                    if (URL_MAP[url]){
                        old(
                            Object.assign(params, {[quickParams]: URL_MAP[url]})
                        );
                    }
                }
            });
        });
    }
   ```


## 微信(wx || swan || my || tt)小程序路由
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







