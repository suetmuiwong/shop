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
 
  .post('/goods/goodsList.json', goodsInfoController.goodsList)
  .post('/goods/goodsDetail.json', goodsInfoController.goodsDetail)

  .post('/order/orderList.json', orderInfoController.orderList)
  .post('/order/orderDetail.json',orderInfoController.orderDetail)
  .post('/order/deleteOrder.json',orderInfoController.deleteOrder)
  .post('/order/setOrder.json',orderInfoController.setOrder)

  .post('/appeal/appealList.json',appealInfoController.appealList)
  .post('/appeal/appealDetail.json',appealInfoController.appealDetail)
  .post('/appeal/setAppeal.json',appealInfoController.setAppeal)
  .post('/appeal/deleteAppeal.json',appealInfoController.deleteAppeal)

  
  
module.exports = routers
