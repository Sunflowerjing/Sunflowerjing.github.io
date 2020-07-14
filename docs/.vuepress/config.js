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
                        'Linux',
                        'Linux2',
                        'Git',
                        'MongoDB',
                        'shell'
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
                        'npm'
                    ]
                },
                {
                    title: '小程序',
                    children: [
                        '微信小程序基础概念',
                        '微信小程序图片上传、预览、删除',
                        '微信小程序自动发布'
                    ]
                },
                {
                    title: 'node',
                    children: [
                        'NodeJS 基础概念',
                        'NodeJS基础API',
                        'Express',
                        '项目实战总结'
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
                        '递归'
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
                        '联动菜单'
                    ]
                },
                {
                    title: '概念点补充',
                    children: [
                        '名词知识点介绍'
                    ]
                }
            ],
            '/about/': [
                {
                    title: '补充',
                    children: [
                        '如何提升'
                    ]
                }
            ]
        }
    }
}