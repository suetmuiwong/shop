/**
 * 订单的所有路由
 */

const router = require('koa-router')()
const orderInfoController = require('./../api/orders/orders.controller')


router.post('/orderList', orderInfoController.orderList)
router.post('/orderDetail',orderInfoController.orderDetail)
router.post('/deleteOrder',orderInfoController.deleteOrder)
router.post('/setOrder',orderInfoController.setOrder)



module.exports = router;


