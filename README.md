#简介
    这是一个用koa2+nodejs+mysql写的API项目
#项目环境
    nodejs >= 7.0.0
    npm >= 3.0.0

    注释：npm安装不佳的可以使用 cmpn  安装命令   npm install -g cnpm --registry=https://registry.npm.taobao.org

#快速启动

    # 初始化数据库 安装MySQL5.6以上版本
    # 创建数据库 创建命令 create database shop; 
    # 配置项目 config.js 文件   
    # 安装依赖 命令 npm install
    # 数据库初始化 命令 npm run init_sql
    # 启动服务 命令 npm run start_server

#接口访问地址： http://localhost:9000/shopapi/

# 注册接口

  # url:http://localhost:9000/shopapi/user/signUp
  # 参数：userName，email，password，confirmPassword，agreement





#参考资料

https://chenshenhai.github.io/koa2-note/note/project/route.html