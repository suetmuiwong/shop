const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors') //允许跨域的中间件
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')
const routers = require('./routers/index')

//const passport = require('./passport') //用于验证登录

//token
// const jwt = require('jsonwebtoken')
// const jwtKoa = require('koa-jwt')
const jwt = require('koa-jwt')
// console.log('22222222')
// console.log(jwt)
//console.log(jwtKoa)



const app = new Koa()

// 配置存储session信息的mysql
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}


// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  cookie: {                   // 与 cookie 相关的配置
    domain: '',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    maxAge: 1000 * 30,      // cookie 有效时长
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: false        // 是否允许重写
  }
}))


//增加验证登录
//app.use(passport.initialize())
//app.use(passport.session())
app.use(jwt({secret: config.jwt_secret}).unless({path:[/^\/user\/signInPin.json/,/^\/user\/signIn.json/, /^\/user\/signUp.json/]}))



// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

//允许跨域
// app.use(cors())

app.use(cors({
  origin: function (ctx) {
      return ctx.header.origin 
  },
  credentials:true
}))



// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
