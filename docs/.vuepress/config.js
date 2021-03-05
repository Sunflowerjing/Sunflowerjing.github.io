module.exports = {
    title: 'Sunflower',  // 网站的标题
    description: 'Vuepress blog demo',   // 网站的描述
    themeConfig: {
        repo: 'https://github.com/Sunflowerjing/Sunflowerjing.github.io', // GitHub仓库地址
        repoLabel: 'GitHub', // 自定义仓库链接文字。
        nav: [
            { text: '博客', link: '/blog/' },
            { text: '零散知识', link: '/scattered/'},
            { text: '阅读', link: '/book/' },
            { text: '关于', link: '/about/' }
        ],
        sidebar: {
            '/blog/':[
                {
                    title: 'Dev',
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        'MySQL基础',
                        'PHP基础',
                        'PHP升级',
                        'Linux基础命令',
                        'Linux',
                        'Linux2',
                        'MongoDB',
                        'shell',
                        'Git',
                    ]
                },
                {
                    title: 'CSS',
                    children: [
                        'CSS3知识点梳理',
                        'CSS 单位'
                    ]
                },
                {
                    title: 'JS',
                    children: [
                        '基本概念',
                        'Moment',
                        '字符串方法',
                        '数组方法',
                        '手写集合',
                        'JavaScript&QA工程师',
                        'JavaScript函数编程',
                        'JavaScript面试题目',
                        'Redux',
                        'npm',
                        'Promise',
                        'ES集合',
                        'EventLoop',
                        '框架',
                        '设计模式',
                        'JS 模块规范',
                        'package文件学习',
                    ]
                },
                {
                    title: 'TS',
                    children: [
                        'TS基本知识',
                        'TS函数接口泛型',
                    ]
                },
                {
                    title: '三大框架',
                    children: [
                        'React基础',
                        'React基础2',
                        'React进阶1'
                    ]
                },
                {
                    title: '小程序',
                    children: [
                        '微信小程序基础概念',
                        '微信小程序图片上传、预览、删除',
                        '微信小程序自动发布',
                        '小程序监控体系'
                    ]
                },
                {
                    title: 'node',
                    children: [
                        'NodeJS 基础概念',
                        'NodeJS基础API',
                        'NodeJS基础API2',
                        'stream模块',
                        'net 模块', 
                        'Koa',
                        'Express',
                        'Express和Koa的比较',
                        '项目实战总结',
                        'PM2'
                    ]
                },
                {
                    title: '打包工具',
                    children: [
                       'webpack基础',
                       'webpack高级',
                       'rollup',
                       'Gulp',
                       'Grunt',
                       'Bower',
                       'Yeoman',
                       'Browserify',
                       'Parcel'
                    ]
                },
                {
                    title: '工程化&性能优化',
                    children: [
                        '前端架构',
                        '前端工程化基础知识',
                        'FIS',
                        '前端性能优化',
                        'Vue SSR实现原理',
                    ]
                },
                {
                    title: '网络协议',
                    children: [
                       'HTTP 协议',
                       '代理'
                    ]
                },
                {
                    title: '算法',
                    children: [
                        '二分查找',
                        '快速排序',
                        '递归',
                        '二叉树',
                        '斐波那契数',
                        '队列和堆栈的转换'
                    ]
                },
                {
                    title: '正则',
                    children: [
                        '正则基础知识点',
                    ]
                }
            ],
            '/scattered/':[
                {
                    title: '常用快捷键',
                    children: [
                        'MAC',
                        'VsCode'
                    ]
                },
                {
                    title: '前端界面常见需求',
                    children: [
                        '联动菜单',
                        'React 父组件调子组件方法',
                        '监听路由变化',
                        '缓存',
                        '渐变',
                        '小程序onPageNotFound的坑',
                        'nodejs全目录查找某个字符串'
                    ]
                },
                {
                    title: '概念点补充',
                    children: [
                        '名词知识点介绍',
                        'JS 移动端开发模式'
                    ]
                },
                {
                    title: '工具网址',
                    children: [
                        '实用工具网站'
                    ]
                },
                {
                    title: 'npm',
                    children: [
                        '库'
                    ]
                },
                {
                    title: '问题总结',
                    children: [
                        '待梳理',
                        '代码质量提升小结'
                    ]
                }
            ],
            '/book/':[
                {
                    title: '生活',
                    children: [
                        '假学习和假努力',
                        '樊登讲论语',
                        '费曼学习法',
                        '法则',
                    ]
                },
                {
                    title: '技术',
                    children: []
                }
            ],
            '/about/': [
                {
                    title: '补充',
                    children: [
                        '如何提升',
                    ]
                }
            ]
        }
    }
}