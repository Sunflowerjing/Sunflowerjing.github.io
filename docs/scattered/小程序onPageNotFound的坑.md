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

    const ENV = getNameSpace();
    if (ENV){ // 小程序
        miniRouterFn.forEach(function (hook) {
            const old = ENV[hook];
            Object.defineProperty(ENV, hook, {
                value: function (params) {
                    const completeURL =  params.url;
                    const index = completeURL && completeURL.indexOf('?');
                    let url = '';
                    let urlParams = '';
                    // 判断 跳转 url 中是否带参数
                    if(index != -1){
                        url = completeURL.slice(0, index);
                        urlParams = completeURL.slice(index);
                    } else {
                        url = completeURL;
                    }
                    // 含有参数就拼接, 否则正常跳转
                    if (URL_MAP[url]) {
                        params.url = urlParams ? `${URL_MAP[url]}?${urlParams}` : `${URL_MAP[url]}`;
                    }
                    old(params);
                }
            });
        });
    } else if (process.env.ANU_ENV === 'quick') { 
        // 快应用(因为每个页面都要hook, 快应用的路由)。
        // 所以在onGlobalShow, 判断
        // if (process.env.ANU_ENV === 'quick') {
		//	    var quickHookUrl = require('./common/utils/hookUrl/quick');
		//	    quickHookUrl();
		// }

        // hook 快应用原生 
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

        // hook 娜娜奇, 写在单独的文件中
        var quickHookUrl = function() {
            if (process.env.ANU_ENV === 'quick') {
                ['navigateTo', 'redirectTo', 'navigateBack'].forEach((apiName) => {
                    if(global && global.React){
                        const oldApi = global.React.api[apiName];
                        global.React.api[apiName] = function(params) {
                            const completeURL =  params.url;
                            const index = completeURL && completeURL.indexOf('?');
                            let url = '';
                            let urlParams = '';
                            // 判断 跳转 url 中是否带参数
                            if(index != -1){
                                url = completeURL.slice(0, index);
                                urlParams = completeURL.slice(index);
                            } else {
                                url = completeURL;
                            }
                            // 含有参数就拼接, 否则正常跳转
                            if (URL_MAP[url]) {
                                params.url = urlParams ? `${URL_MAP[url]}?${urlParams}` : `${URL_MAP[url]}`;
                            }
                            oldApi(params);
                        }
                    }
                })
            }
        }
        module.exports = quickHookUrl;
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







