module.exports = {
    title: 'Sunflower',  // 网站的标题
    description: 'Vuepress blog demo',   // 网站的描述
    // base: '/gh-pages/',
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
                        'PHP基础'
                    ]
                },
                {
                    title: 'CSS',
                    children: [
                
                    ]
                },
                {
                    title: 'JS 基础',
                    children: [
                
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
                
            ]
        }
    }
}