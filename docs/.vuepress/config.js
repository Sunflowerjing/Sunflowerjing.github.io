module.exports = {
    title: 'Sunflower',  // 网站的标题
    description: 'Vuepress blog demo',   // 网站的描述
    base: '/Sunflowerjing.github.io/',
    themeConfig: {
        repo: 'https://github.com/Sunflowerjing/Sunflowerjing.github.io', // GitHub仓库地址
        repoLabel: 'GitHub', // 自定义仓库链接文字。
        nav: [
            { text: '博客', link: '/blog/' },
            { text: '零散知识', link: '/scattered/'},
            { text: '关于', link: '/about/' }
        ],
        sidebar: {
            '/blog/':[
                {
                    title: '博客标题一',
                    children: [
                        'blog1-1',
                        'blog1-2'
                    ]
                },
                {
                    title: '博客标题二',
                    children: [
                        'blog2-1',
                        'blog2-2'
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