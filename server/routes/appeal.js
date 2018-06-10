/**
 * 申诉的所有路由
 */

const router = require('koa-router')()
const appealInfoController = require('./../api/appeal/appeal.controller')


router.post('/appealList',appealInfoController.appealList)
router.post('/appealDetail',appealInfoController.appealDetail)
router.post('/setAppeal',appealInfoController.setAppeal)
router.post('/deleteAppeal',appealInfoController.deleteAppeal)


module.exports = router;



