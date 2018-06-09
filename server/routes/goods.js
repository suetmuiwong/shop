/**
 * 商品的所有路由
 */

const router = require('koa-router')()
const goodsInfoController = require('./../api/goods/goods.controller')


router.post('/goodsList', goodsInfoController.goodsList) //商品列表
router.post('/goodsDetail',goodsInfoController.goodsDetail) // 商品详情



module.exports = router;