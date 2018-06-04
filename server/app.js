const http = require('http');
const fs = require('fs');
const path = require('path');
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const cors = require('koa2-cors') //允许跨域的中间件

const app = require('./config/koa');
const config = require('./config/environment');
const query = require('./utils/db-util');
//const routers = require('./routers/index')


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


//允许跨域
// app.use(cors())
app.use(cors({
  origin: function (ctx) {
      return ctx.header.origin 
  },
  credentials:true
}))



// app.use(async(ctx, next) => {
//  // ctx.execSql = query;
//   ctx.set('Access-Control-Allow-Origin', config.accessControlAllowOrigin);
//   await next();
// });

// routes
// fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
//     if (file == "index.js") {
//       console.log('&&&&&&&&&&&&&&&&&&&&测试测试')
//       app.use(require(path.join(__dirname, 'routes', file)).routes());
//     }
// });

app.use(require(path.join(__dirname, 'routes', 'index.js')).routes());

// app.use(function (ctx, next) {
//    ctx.redirect('/404.html');
// });

app.on('error', (error, ctx) => {
  console.log('something error ' + JSON.stringify(ctx.onerror));
  ctx.redirect('/500.html');
})

const server = http.createServer(app.callback())
	.listen(config.port)
	.on('listening', function () {
	  console.log('server listening on: ' + config.port);
  });








