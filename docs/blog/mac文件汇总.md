# mac文件汇总

## 基础知识
1. `Shell ` 脚本(shell script),是一种为 shell 编写的脚本程序。 
    * shell 是一个语言，语言需要 `解释器/编译` 器，来执行它。
    * `bash / zsh / ....` 就是 shell 代码的解释程序
    * `oh my zsh` 是基于 zsh 做的扩展


2. `rc` 结尾，一般是程序的`配置文件`，比如 .zshrc、.bashrc、.vimrc
    * .bashrc -> bash
    * .zshrc -> zsh
    * `export PATH=$PATH:/home/gengjingjing/***/bin` 之后要执行 `source ~/.bash_profile`
        * `echo $PATH` 输出$PATH 是什么
        * `:` 代表的是分割 
    * ps aux | grep mysql 查看进程


3. bash 配置文件
    * `.bash_profile` 或 `.bashrc`
    * ubuntu 16.04: bash 的默认配置文件是 `.bash_profile`
    * ubuntu 20.04: bash 的默认配置文件是 `.bashrc`


4. zsh 配置文件
    * `.zshrc` zsh的配置文件


5. .bash_history
    * 用 bash 所有执行的命令都会记录在这里

    * history 命令是: 将所有执行过的命令都会输出
    * `tail -n 3` 尾部3个输出
    * `history | tail -n 3` 筛选最后执行的3个命令
    * 

6. ~/.ssh


7. 用户 与 系统文件
    * 用户是在
        * ~
    * 系统是在
        * /usr/local/***/bin 
        * /etc/ 

8. homebrew 的命令为 brew
    * 安装方式为 brew install 包名
    * 起别名 alias woman=tldr 命令行用woman, 其实就是访问tldr。
        * 使用: woman curl
        * 使用: woman open

9. 命令行中粘贴复制
    * pbcopy
        * 使用 echo '简简单单, 平平淡淡' | base64 | pbcopy
    * pbpaste
        * 命令行写: pbpaste

10. 关机命令
    * shutdown 
    * 忘记怎么使用就 tldr shutdown
