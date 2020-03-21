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







