
/**
 * 用户的所有路由
 */

const router = require('koa-router')()
const userInfoController = require('./../api/user/user.controller')

router.post('/signUp', userInfoController.signUp) //认证注册

router.get('/signInPin',userInfoController.pin) // 登录时的图形验证码
router.post('/signIn',userInfoController.signIn) //认证登录

router.get('/logout', function (ctx, next) { //认证登出
    ctx.logout()
    // ctx.body = '001'
})

module.exports = router;