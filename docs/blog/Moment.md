# Moment

1. 安装: 以下几种方式
    * npm: `npm install moment`
    * Yarn: `yarn add moment`

2. js moment`时间戳与时间格式`相互转换
```
var moment = require('moment');

获取时间戳 : var res = moment(Date.now(), 'YYYY-MM-DD HH:mm:ss').valueOf();

获取格式时间: var res = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
```

3. `new Date()`
    * `new Date()`: 拿到当前时间戳, 时间戳的单位是毫秒
    * `获取当前时间距离1970/1/1 的秒数`: 当前时间戳/1000
    * `获取当前时间距离1970/1/1 的分钟数`: 当前时间戳/1000/60
    * `获取当前时间距离1970/1/1 的小时数`: 当前时间戳/1000/60/60 = 当前时间戳/1000/3600 = 当前时间戳/36e5 
    * `获取当前时间距离1970/1/1 的天数`: 当前时间戳/1000/60/60/24









