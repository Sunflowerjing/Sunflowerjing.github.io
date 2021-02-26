# Grunt

1. 功能 
    * 自动化构建工具
    * 例如: 对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等.

2. 理解
    * Grunt是一个平台，没有`插件`，Grunt什么事也不能做
    * 它是提供了一个标准，任何插件都要去遵守的一个机制和规则。
    * 就和USB接口一样，接在USB插口的，有可能是U盘，摄像头这些完成不同功能的外设。
3. Grunt插件
    * JSHint: 代码检查工具
    * less: css预处理器
    * 生态插件很棒

4. 安装
    * 全局: `npm install -g grunt-cli`
    * 项目: `npm install grunt -D`
    * 配置文件: `Gruntfile`

5. 应用
    ```javascript
    // 功能压缩合并, 配置文件: Gruntfile
    module.export = function(grunt){
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
             // 压缩
            uglify: {
                // 这里是uglify任务的配置信息
                options: {
                    // 压缩的时候, 设置在文件顶部进行日期插入
                    banner: '/*!create by <%=grunt.template.today("yyyy-mm-dd")%*/\n'
                },
                // 静态资源指定目录
                static_mappings: {
                    files:[{
                        src: 'js/index.js',
                        dest: 'build/index.min.js'
                    },{
                        src: 'js/index.js',
                        dest: 'build/main.min.js'
                    }]
                }
            },
            // 合并
            concat: {
                // 这里是concat任务的配置信息。
                bar: {
                    src: ['build/*.js'], // build下面的所有 js
                    dest: 'dest/all.min.js'
                }
            },
            // 观察本地文件变化，让其 OK 工作
            watch: {
                files: ['js/iindex.js'],
                tasks: ['uglify', 'concat']
            }
            // 任意数据。
            my_property: 'whatever',
            my_src_files: ['foo/*.js', 'bar/*.js'],
        });
        // 加载包含 uglify 任务的插件
        grunt.loadNpmTasks("grunt-contrib-uglify"); // 需要安装本地的目录里面 npm install grunt-contrib-uglify -D
        grunt.loadNpmTasks("grunt-contrib-concat");
        grunt.loadNpmTasks("grunt-contrib-watch");
        // 默认执行任务列表
        grunt.registerTask('default',['uglify', 'concat', 'watch'])
    }    
    ```

