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


// app.use( async ( ctx ) => {

//   // 设置session
//   if ( ctx.url === '/api/user/signIn.json' ) {
//     console.log('登录地址')
//       ctx.session = {
//           user_id: Math.random().toString(36).substr(2),
//           count: 0
//       }
//       ctx.body = ctx.session
//       console.log(ctx.session)
//   } else{
//     console.log('其他地址')
//     console.log(ctx.session)
//     console.log(ctx)
//     console.log( ctx.request)
//     console.log(ctx.response)

//       // 读取session信息
//       ctx.session.count = ctx.session.count + 1
//       ctx.body = ctx.session
//   }

// })




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
