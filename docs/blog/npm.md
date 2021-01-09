# npm


1. linux部署技巧: node项目在部署的时候有时候会遇到需要make编译安装的npm包，比如node-sass这类的。如果编译提示权限不够的时候需要改成`npm install --unsafe-perm` 这种形式安装。 即使你用了sudo or root权限npm也会自动转换成一个叫 nobody 的用户来运行，为的是安全。

2. npm install 的区别
    * 一个`node package`有两种依赖, 一种是 `dependencies`，一种是`devDependencies`，其中前者是正常运行该包时所需要的依赖项，而后者则是开发的时候需要的依赖项。
    * `npm install --production`: 只安装dependencies而不安装devDependencies


3. npm link
    * 在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试

