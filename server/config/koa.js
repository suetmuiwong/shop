const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const resource = require('koa-static');
const path = require('path');
const jwt = require('koa-jwt');
const config = require('./environment');
const cors = require('koa2-cors') //允许跨域的中间件
const tokenError = require('../middlreware/tokenError');
const adminAccout = require('../utils/admin-account');

//admin账号通过配置写入到数据库中
if (config.isUpdateAdmin) {
  adminAccout.saveAdminAccount();
}

const app = new Koa();

//console.log('&&&&&&')
//console.log(path.join(config.root, config.appPath))
app.use(bodyParser());

app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/') {
          return "*"; // 允许来自所有域名请求
      }
     return 'http://localhost:8888'; // 这样就能只允许 http://localhost:8888 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))



app.use(tokenError());

app.use(koaJson());
//app.use(resource(path.join(config.root, config.appPath)));
app.use(jwt({
  secret: config.tokenSecret
}).unless({ //不用验证的接口
  path: [/^\/shopapi\/user\/signInPin/,/^\/shopapi\/user\/signIn/,/^\/shopapi\/user\/signUp/,/^\/shopapi\/user\/logout/,]
}));

module.exports = app;



 
