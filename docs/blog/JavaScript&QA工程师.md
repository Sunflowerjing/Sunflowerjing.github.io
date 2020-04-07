# JavaScript&QA工程师

## 单元测试
1. `why`:
    * `正确性`: 测试可以验证代码的正确性。
    * `自动化`: 通过编写测试用例，可以做到一次编写，多次运行。
    * `解释性`: 测试用例用于测试接口、模块的重要性，那么在测试用例中就会涉及如何使用这些API。
    * `驱动开发，指导设计`: 保证代码的可测试性，就需要在开发中注意API的设计，TDD将测试前移就是起到这么一个作用
    * `保证重构`: 怎么才能保证重构后代码的质量呢?有测试用例做后盾，就可以大胆的进行重构
2. `目的`: 单元测试能够让开发者明确知道代码结果
3. `原则`: 单一职责、接口抽象、层次分离
4. `断言库`: 保证最小单元是否正常运行检测方法
5. `测试风格`: 敏捷开发方法论(包含测试驱动开发和行为驱动开发)
    * TDD 测试驱动开发
        * 关注所有的功能是否被实现(每一个功能都必须有对应的测试用例)
        * suite配合test利用assert('tobi' == user.name);结果先行
        * 先写测试用例, 在去开发测试
    * BDD 行为驱动开发
        * 关注整体行为是否符合整体预期,编写的每一行代码都有目的提供一个全面的测试用例集。
        * expect/should, describe配合it利用自然语言expect(1).toEqual(fn())执行结果。
        * 先开发, 在测试
    * 比较常用的测试包
        * chai.js(TDD BDD双模) 
        * Jasmine.js(BDD)
6. `单元测试运行流程`: 每一个测试用例组通过describe进行设置
    * before -> beforeEach -> it -> after -> afterEach
    ```
    describe   => before、after
        it     => beforeEach、afterEach
        it     => beforeEach、afterEach
        it     => beforeEach、afterEach
    ```
    * before单个测试用例(it)开始前
    * beforeEach每一个测试用例开始前
    * it定义测试用例并利用断言库进行设置chai如: expect(x).to.equal(true); 异步mocha
    * 以上专业术语叫mock
## 性能测试
## 安全测试
## 功能测试

## karma 自动化单元测试
* karma 自动化 runner 集成 PhantomJS 无刷新
1. 安装单元测试框架: `npm install karma --save-dev`
2. 执行 karma init 命令, 生成 karma.conf.js 测试框架选择 jasmine, 浏览器选择PhantomJS
```
package.json 里添加
"unit:init": "karma init",    // 初始化
"unit:start": "karma start"   // 运行
```
3. 安装断言库
* npm install karma-jasmine jasmine-core --save-dev
* npm install --save-dev karma-phantomjs-launcher
* 下载安装PhantomJS, 配置路径
    * export PHANTOMJS_BIN = /usr/local/bin/phantomjs
4. 安装生成测试报告和代码覆盖率检测工具
npm install karma karma-coverage --save-dev
5. karma.conf.js 配置文件
```
{
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        "./src/**/*.js",
        "./unit/unit/**/*.spec.js"
    ], 
    exclude: [],
    preprocessors: {
      "src/**/*.js": ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : './docs/coverage/'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: true,
    concurrency: Infinity
}
```


## UI 测试



