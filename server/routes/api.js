/**
 * restful api 子路由
 */

const router = require('koa-router')()
//const userInfoController = require('./../controllers/user-info')
const goodsInfoController = require('./../controllers/goods-info')
const orderInfoController = require('./../controllers/order-info')
const appealInfoController = require('./../controllers/appeal-info')

const routers = router
  // .get('/user/signInPin.json',userInfoController.pin)
  // .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  // .post('/user/signIn.json', userInfoController.signIn)
  // .post('/user/signUp.json', userInfoController.signUp)
 
  .post('/goods/goodsList', goodsInfoController.goodsList)
  .post('/goods/goodsDetail', goodsInfoController.goodsDetail)

  .post('/order/orderList', orderInfoController.orderList)
  .post('/order/orderDetail',orderInfoController.orderDetail)
  .post('/order/deleteOrder',orderInfoController.deleteOrder)
  .post('/order/setOrder',orderInfoController.setOrder)

  .post('/appeal/appealList',appealInfoController.appealList)
  .post('/appeal/appealDetail',appealInfoController.appealDetail)
  .post('/appeal/setAppeal',appealInfoController.setAppeal)
  .post('/appeal/deleteAppeal',appealInfoController.deleteAppeal)

  
  
module.exports = routers
