# Qunar 小程序瘦身方案


> 随着业务的迭代, 去哪儿小程序逐渐臃肿, 主包突破了微信小程序大小限制, 小程序瘦身迫在眉睫。导致在主包中的新增需求, 无法完成。


### 技术方案
目前常见的小程序瘦身方案有`剔除无用文件`、`压缩图片`和 `CDN 缓存`、`复用代码`等, 但以上效果不够理想。于是大胆尝试`拆包方案`




### 项目成果
微信小程序主包 size 缩减330kb (压缩后)。 此外还减少小程序首次渲染时间, 避免不必要的组件和页面渲染, 提升用户体验。据微信小程序后台统计, 主包下载耗时减少100ms, 渲染减少50ms。




### 实现方案
1. 图片: 图片不存放到项目中, 使用图片以 CDN 的形式
2. 加载: 由于微信、支付宝、百度小程序、普通快应用和华为快应用，五个平台共用一套主包, 则会根据不同平台打包不同产物
3. 拆包(主要方案): 将除 Tabbar 以外相对独立的页面和组件拆为分包
    * 目标: 由于拆包改动页面路径, 为了让业务线无感, 不修改业务代码。

### 路由处理   
1. 端内页面相互跳转
    * 小程序端内相互跳转: 定义此次改动 URL 的 map 文件, 根据不同小程序环境劫持原生底层路由(reLaunch、rediectTo、navigateTo)
        ```javascript
        // 核心逻辑如下
        ['reLaunch', 'redirectTo', 'navigateTo'].forEach(function (hook) {
            const old = ENV[hook];
            Object.defineProperty(ENV, hook, {
                value: function (params) {
                    if (typeof params.url === 'string' && !params.url) {
                        old(params);
                        return;
                    }

                    const completeURL =  params.url;
                    const index = completeURL && completeURL.indexOf('?');
                    let url = '';
                    let urlParams = '';
                
                    // 判断 跳转 url 中是否带参数
                    if (index != -1){
                        url = completeURL.slice(0, index);
                        urlParams = completeURL.slice(index);
                    } else {
                        url = completeURL;
                    }

                    // 含有参数就拼接, 否则正常跳转
                    if (URL_MAP[url]) {
                        params.url = urlParams ? `${URL_MAP[url]}${urlParams}` : `${URL_MAP[url]}`;
                    }
                
                    old(params);
                },
                writable: true
            });
        });

        ```
    * 快应用端内相互跳转: 因为快应用禁止劫持底层路由方法, 所以在ReactQuick.js 中进行处理
        ```javascript
        if (typeof app.onNavigate === 'function') {
            obj = app.onNavigate(obj) || obj;
        }

        onNavigate(pathInfo) {
            const patchQuick404Module = require('./common/utils/hookUrl/patchQuickUrl');
            const matchedPathInfo = patchQuick404Module.getMatchedPathInfo(pathInfo.url);
        
            if (matchedPathInfo && matchedPathInfo.path) {
                const patchedPath = `${matchedPathInfo.path}${matchedPathInfo.queryString ? '?' + matchedPathInfo.queryString : ''}` ;
                return Object.assign(pathInfo, {
                    url: patchedPath
                })
            }
        }

        ```


2. 端外跳端内
    * 在外部链接跳转到小程序或快应用中, 即使做了 MAP 映射, 也会显示 404 错误。
    * 原因: 外部跳转进来的 URL, 不会使用reLaunch、rediectTo、navigateTo以上 API, 则不会走此次劫持
    * 解决方案: 在 `app.js` 中的 `onPageNotFound` 方法进行处理。若访问路径存在 map 文件中, 则调用 `React.api.redirectTo` 函数进行处理,小程序和快应用处理逻辑相同










