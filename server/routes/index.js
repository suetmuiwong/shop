/**
 * 整合所有子路由
 * 修改:2018/5/31
 */
  const router =  require('koa-router')();
  const user = require('./user');
  const goods = require('./goods');
  const orders = require('./orders');
  const appeal = require('./appeal');

  
  router.use('/shopapi/user', user.routes(), user.allowedMethods());
  //router.use('/shopapi/goods', goods.routes(), goods.allowedMethods());
  //router.use('/shopapi/orders', orders.routes(), orders.allowedMethods());
  //router.use('/shopapi/appeal', appeal.routes(), appeal.allowedMethods());

  
  module.exports = router;



