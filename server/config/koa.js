const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const resource = require('koa-static');
const path = require('path');
const jwt = require('koa-jwt');
const config = require('./environment');
const tokenError = require('../middlreware/tokenError');
const adminAccout = require('../utils/admin-account');

//admin账号通过配置写入到数据库中
if (config.isUpdateAdmin) {
  adminAccout.saveAdminAccount();
}

const app = new Koa();

//console.log('&&&&&&')
//console.log(path.join(config.root, config.appPath))

app.use(tokenError());
app.use(bodyParser());
app.use(koaJson());
//app.use(resource(path.join(config.root, config.appPath)));
app.use(jwt({
  secret: config.tokenSecret
}).unless({ //不用验证的接口
  path: [/^\/shopapi\/user\/signInPin/,/^\/shopapi\/user\/signIn/,/^\/shopapi\/user\/signUp/,/^\/shopapi\/user\/logout/,]
}));

module.exports = app;