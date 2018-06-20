#简介
    这是一个用koa2+nodejs+mysql写的API接口项目
#项目环境
    nodejs >= 7.0.0
    npm >= 3.0.0

#快速启动

    # 初始化数据库 安装MySQL5.6以上版本
    # 创建数据库 创建命令 create database shop; 
    # 配置项目 config.js 文件   
    # 安装依赖 命令 npm install
    # 数据库初始化 命令 npm run init_sql
    # 启动服务 命令 npm run start_server

#项目目录
    #init //数据库相关文件夹
        #sql //表文件夹
            #appeals.sql //申诉表
            #goods.sql //商品表
            #orders.sql //订单表
            #user.sql //用户表
        #util //数据库操作通用工具文件夹
            #db.js //连接池
            #get-sql-content-map.js //获取表内容
            #get-sql-map.js //遍历表文件
            #walk-file.js //执行文件
        #index.js //主页
    #node_modules //依赖包
    #server //项目主要文件
        #api //api文件夹
            #appeal //申诉文件夹
                #appeal.controller.js //申诉controller文件
                #appeal.model.js //申诉model文件
                #appeal.service.js //申诉service文件
            #goods
                #goods.controller.js
                #goods.model.js
                #goods.service.js
            #orders
                #orders.controller.js
                #orders.model.js
                #orders.service.js
            #user
                #user.controller.js
                #user.model.js
                #user.service.js
        #codes // 提示码文件夹
            #error.js //错误码文件
        #config //项目相关配置文件夹
            #environment.js //基本的相关配置文件
            #koa.js //koa配置文件
        #middlreware //koa中间件文件夹（自定义）
            #tokenError.js //token验证中间件文件
        #routes //接口路由文件夹
            #appeal.js //申诉部分的接口路由文件
            #goods.js //商品部分的接口路由文件
            #index.js //路由主入口文件
            #orders.js //订单部分的接口路由文件
            #user.js //用户部分的接口路由文件
        #utils //项目通用工具文件夹
            #admin-account.js //创建admin用户文件
            #datetime.js //日历时间格式化文件
            #db-util.js //数据库操作文件
            #helper.js //一些共用工具文件
            #type.js //类型判断工具文件
            #upload.js //文件(图片)上传文件
        #app.js //项目主入口文件
    #editorconfig //编辑配置文件
    #gitignore //git忽略配置文件
    #package-lock.json 
    #package.json

#接口访问地址
    # http://127.0.0:9000/shopapi/

#用户
    # url:http://localhost:9000/shopapi/user/signInPin get //获取图片验证码
    # url:http://localhost:9000/shopapi/user/signIn post 
        #参数:userName:用户名， password：密码  verify 验证码 eg(admin,123456,abcdef)
    # url:http://localhost:9000/shopapi/user/signUp post 
        #参数：userName password
  
#商品
    # url:http://localhost:9000/shopapi/goods/goodsList post 
        #参数：pageIndex:第几页，start:每页开始的数据顺序，limit：每条的数据条数
    # url http://localhost:9000/shopapi/goods/goodsDetail post 
        #参数：goodsId:商品id

#订单
    # url:http://localhost:9000/shopapi/orders/orderList post
        #参数：status:订单状态(0全部,1已支付,2未支付),pageIndex:第几页，start:每页开始的数据顺序，limit：每条的数据条数
    # url:http://localhost:9000/shopapi/orders/orderDetail post
        #orderId:订单id
    # url:http://localhost:9000/shopapi/orders/setOrder post
        #参数：goodsId: 商品id,goodsCount:商品数量,totalMoney:总价,realTotalMoney:折扣后的总价,
    # url:http://localhost:9000/shopapi/orders/deleteOrder post
        #参数：orderId：订单id

#申诉 
    # url:http://localhost:9000/shopapi/appeal/appealList post
        #参数：pageIndex:第几页，start:每页开始的数据顺序，limit：每条的数据条数
    # url:http://localhost:9000/shopapi/appeal/appealDetail post
        #参数：appealId:申诉id
    # url:http://localhost:9000/shopapi/appeal/setAppeal post
        #参数：appealOrder:申诉的订单号, appealType: 申诉类型（1.2.3.4）, appealDes:申诉描述,appealManageStatus: 申诉处理状态, appealContact: 申诉人联系方式,

#特别的
    #使用jwt创建token，在登录验证成功后，签发token返回到客户端（客户端保存在token中），需要验证的接口，对token进行验证
        #规定需要验证与非验证的接口：
            #app.use(jwt({
                #secret: config.tokenSecret
            #}).unless({ //不用验证的接口
                #path: [/^\/shopapi\/user\/signInPin/,/^\/shopapi\/user\/signIn/,/^\/shopapi\/user\/signUp/,/^\/shopapi\/user\/logout/,]
            #}));
        #token,服务端使用，签发token，user.controller登录中
          #  用户token
            #const userToken = {
               # name: userName,
               # id: results.id
            #};
          # 签发token，其中tokenSecret可自定
            #const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '600h' });
          # 验证登录token请参考middlreware文件夹中的tokenError.js文件
        #token，客户端使用如：用fetch ，设置header： 
          # headers: {
               # 'Content-Type': 'application/x-www-form-urlencoded',
               # 'Authorization':  'Bearer '+localStorage.getItem("token") //注意：一定要按这格式
          #},


#参考资料

https://chenshenhai.github.io/koa2-note/note/project/route.html