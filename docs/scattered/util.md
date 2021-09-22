# util

1. url 参数转对象
```js
/**
 * getQueryObject
 * 获取query对象
 * author: sunflower
 * 例如 输入 ?category=qp&hybridId=test 输出 {category: 'qp', hybridId:'test'}
 * @param {any} string query
 * @returns object
 */
function getQueryObject(str = '') {
    if (!str) {
        return {};
    }
    str = str.replace('?', '');
    const strArr = str.split('&') || [];
    const result = {};
    strArr &&
        strArr.forEach &&
        strArr.forEach(item => {
            const itemArr = item.split('=');
            result[itemArr[0]] = itemArr[1];
        });
    return result;
}
```


2. 将对象转 url参数
```js
/**
 * transObjectToQuery
 * 将对象转化为query
 * author: sunflower
 * 例如  输入 {category: 'qp', hybridId: 1} 输出 ?category=qp&hybridId=test
 * @param {any} object
 * @returns string
 */
function transObjectToQuery(obj = {}) {
    const result = [];
    for (const i in obj) {
        if (typeof obj[i] === 'string' || typeof obj[i] === 'number') {
            result.push(`${i}=${obj[i]}`);
        }
    }
    const query = result.join('&');
    return `?${query}`;
}
```

3. 在 url 后追加参数
```js
/**
   * baseAddUrlQuery
   * 将对象转化为query, 并将query添加在传入的 URL 中
   * author: sunflower
   * 例如  输入url {name: 'gengjingjing', age: 18} 输出 `http://127.0.0.1?name=gengjingjing&age=18`
   * @param {any} string object
   * @returns string
*/
function baseAddUrlQuery(url, obj = {}) {
    const result = [];
    for (const i in obj) {
        if (typeof obj[i] === 'string' || typeof obj[i] === 'number') {
            result.push(`${i}=${obj[i]}`);
        }
    }
    const query = result.join('&');
    const newUrl = `${url}`+(url.split('?')[1] ? '&':'?') + `${query}`;
    return newUrl;
  },
```



4. 下划线转驼峰
```js
function underlineToCamel(str = '') {
    return str.replace(/_([a-zA-Z])/g, function (g) {
        return g[1].toUpperCase();
    });
}
```



5. 驼峰转下划线
```js
function camelToUnderline(str = '') {
    return str.replace(/([A-Z])/g, function (g) {
        return '_' + g[0].toLowerCase()
    });
}
```




6. 递归转化对象 转 驼峰命名
```js
function formatObjectToCamel(obj = {}) {
    const formatObj = {};
    Object.keys(obj).forEach((key) => {
        const camelKey = underlineToCamel(key);
        const item = obj[key];
        if (typeof item !== 'object') {
            formatObj[camelKey] = item;
        } else if (item instanceof Array) {
            let formatItem = item;
            if (typeof item[0] === 'object'){
                formatItem = item.map(jtem => formatObjectToCamel(jtem));
            } 
            formatObj[camelKey] = formatItem;
        } else if (item instanceof Object) {
            const formatItem = formatObjectToCamel(item);
            formatObj[camelKey] = formatItem;  
        }
    });
    return formatObj;
}
```




7. 递归转化对象 转 下划线命名
```js
function formatObjectToUnderline(obj = {}) {
    const formatObj = {};
    Object.keys(obj).forEach((key) => {
        const camelKey = camelToUnderline(key);
        const item = obj[key];
        if (typeof item !== 'object') {
            formatObj[camelKey] = item;
        } else if (item instanceof Array) {
            let formatItem = item;
            if (typeof item[0] === 'object') {
                formatItem = item.map(jtem => formatObjectToUnderline(jtem));
            } 
            formatObj[camelKey] = formatItem;
        } else if (item instanceof Object) {
            const formatItem = formatObjectToUnderline(item);
            formatObj[camelKey] = formatItem;  
        }
    });
    return formatObj;
}
```

