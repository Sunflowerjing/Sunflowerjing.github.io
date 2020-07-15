# npm


1. linux部署技巧: node项目在部署的时候有时候会遇到需要make编译安装的npm包，比如node-sass这类的。如果编译提示权限不够的时候需要改成`npm install --unsafe-perm` 这种形式安装。 即使你用了sudo or root权限npm也会自动转换成一个叫 nobody 的用户来运行，为的是安全。

2. 
