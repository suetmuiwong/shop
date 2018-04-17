/**
 * 整合所有子路由
 * 修改:2018/4/3 ，注册、登录与注销单独抽出来判断验证是否登录状态（koa-passport） 
 */

const router = require('koa-router')()
//const passport = require('../passport') //用于验证登录
const userInfoController = require('./../controllers/user-info')
const api = require('./api')


/**
 * 认证注册
 */

router.post('/user/signUp.json', userInfoController.signUp) 

/**
 * 认证登录
 */
router.get('/user/signInPin.json',userInfoController.pin) // 登录时的图形验证码
router.post('/user/signIn.json',userInfoController.signIn)

/**
 * 认证登出
 */
router.get('/user/logout.json', function (ctx, next) {
    ctx.logout()
    // ctx.body = '001'
})


 /**
  * 定义中转路径
  */
router.use('/api', api.routes(), api.allowedMethods())


/**
 * 404页面
 */
router.all('404', '*', ctx => {
    ctx.status = 404
    ctx.body = '404'
  })

module.exports = router


