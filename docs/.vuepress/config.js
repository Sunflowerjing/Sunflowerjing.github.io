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
                    title: 'JS 基础',
                    children: [
                        '基本概念'
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
                        'Express'
                    ]
                },
                {
                    title: '网络协议',
                    children: [
                       
                    ]
                },
                {
                    title: '算法',
                    children: [
                
                    ]
                }
            ],
            '/scattered/':[

            ],
            '/about/': [
                {
                    title: '补充',
                    collapsable: false,
                    children: [
                        '如何提升'
                    ]
                }
            ]
        }
    }
}