# shell

1. 首先创建一个目录: `vi hello.sh`
2. 编写shell第一行: `#!/bin/bash` (为了声明是shell脚本,第一行都要这么写)
3. 添加注释: `#`  (加#的这一行是不生效的)
4. 执行脚本: `./hello.sh` 或 `bash hello.sh`
5. Shell 变量: `your_name="runoob.com"`
    * 变量名和等号之间不能有空格
    * 中间不能有空格，可以使用下划线（_）
6. 搜索文件夹下面的所有 HTML, 并且插入脚本
    ```javascript
    #!/bin/bash
    # 判断参数路径是否存在
    if [ -z "$1" -o ! -e "$1" ]; then
        echo "parameters missed OR folder '$1' not exists"
        exit 1
    fi
    # 过滤文件夹中全部的 html 文件
    files=$(find "$1" -name "*.html")
    # 存在的脚本
    reg='<script\s*type="text/javascript">window.BUILD_ENV\s*=\s*"beta"</script>'
    # 插入的脚本
    rep='s/<head>/<head><script type="text\/javascript">window.BUILD_ENV = "beta"<\/script>/'
    
    
    for filename in $files
    do
        grep -Eq "$reg" "$filename" || (
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macos 系统
                sed -i '' "$rep" "$filename"
            else
                # 其他系统
                sed -i "$rep" "$filename"
            fi
        )
    done
    ```