# nodejs全目录查找某个字符串

* 实现方式
    ```javascript
    var path = require("path");
    var fs = require("fs");
    
    var filePath = process.argv[2];
    var lookingForString = process.argv[3];
    recursiveReadFile(filePath);
    
    function recursiveReadFile(fileName){
        if(!fs.existsSync(fileName)) return;
        if(isFile(fileName)){
            check(fileName);
        }
        if(isDirectory(fileName)){
            var files = fs.readdirSync(fileName);
            files.forEach(function(val,key){
            var temp = path.join(fileName,val);
                        if(isDirectory(temp)) recursiveReadFile(temp);
                        if (isFile(temp)) check(temp);
            })
        }
    }
    function check(fileName){
        var data = readFile(fileName);
        var exc = new RegExp(lookingForString);
            if(exc.test(data))
        console.log(fileName);
    }
    function isDirectory(fileName){
        if(fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
    }
    function isFile(fileName){
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
    }
    function readFile(fileName){
        if(fs.existsSync(fileName)) return fs.readFileSync(fileName,"utf-8");
    }
    ```

* process.argv
    * 属性会`返回一个数组`，其中包含当 Node.js 进程被启动时传入的`命令行参数`。
    * 第一个元素是 `process.execPath`。如果需要访问 `argv[0]` 的原始值，则参见 `process.argv0`。 
    * 第二个元素是正被`执行的 JavaScript 文件的路径`。 
    * 其余的元素是任何额外的`命令行参数`。