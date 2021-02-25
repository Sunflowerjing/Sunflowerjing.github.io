# Gulp

## gulp是什么
* gulp是一个基于`流的构建工具`，可以自动执行指定的任务，就是把前端业务中的一些工作用计算机工具自动完成。

## gulp能做什么
1. 开发环境下，想要能够`按模块组织代码`，监听实时变化
2. css/js预编译，postcss等方案，浏览器前缀自动补全等
3. 条件输出不同的网页，比如app页面和mobile页面
4. 线上环境下，我想要合并、压缩 html/css/javascritp/图片，减少网络请求，同时降低网络负担
5. 压缩静态资源
6. 变更静态资源
7. 给静态资源添加 md5
8. 修改预处理样式后自动编译（SASS，Less）
9. 合并雪碧图
10. 自动刷新浏览器


## 安装gulp
* `npm install --save-dev gulp` //安装到当前项目并在package.json中添加依赖


## 使用
1. 项目根目录创建文件: `gulpfile.js`
2. 文件内容
    ```javascript
    const gulp = require('gulp');
    // 基本使用
    gulp.task('default', function () {
        console.log('ok')
    });
    ```
3. 升级使用
    ```javascript
    // 因为是基于流式的编译, 所以编译很快
    const gulp = require('gulp');
    const uglify = require('gulp-uglify'); // 压缩
    const concat = require('gulp-concat'); // 合并

    const paths = {
        scripts: ['js/index.js', 'js/main.js']
    }
    
    // 基本使用
    gulp.task('default', function () {
        console.log('ok');
        gulp.src("js/*,js") // 找到 js 文件夹, 下面的所有 js. 可以换成上面的 paths
            .pipe(uglify()) // 压缩
            .pipe(concat("all.min.js")) // 上面两行作为此行的输入
            .pipe(gulp.dest("build")) // 指定目录
    });
    ```
