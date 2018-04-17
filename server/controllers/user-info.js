const userInfoService = require('./../services/user-info')
const tokenInfoService = require('./../services/token-info')
const errorCode = require('./../codes/error')
const ccap = require('ccap')();

//加密
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const config = require('../../config')


module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象 
   */


  async signIn(ctx) {

    let formData = ctx.request.body
    let result = {}
    let userResult = await userInfoService.signIn(formData)
    let userdata = await tokenInfoService.checkToken('token');
    console.log('444444')
    console.log(ctx.session)
    console.log(ctx.session.captcha.toUpperCase())
    console.log(formData.pin.toUpperCase())

    if (ctx.session.captcha.toUpperCase() == formData.pin.toUpperCase()) {

      if (userResult) {
        if (formData.userName === userResult.name) {
          //新增获取session登录成功返回token
          let userResult = await userInfoService.signIn(formData)
          const token = base.signToke(user)
          ctx.response.status = 200;
          result.success = true;
          result.token= token;
          
          ctx.session.isLogin = true
          ctx.session.userName = userResult.name
          ctx.session.userId = userResult.id

          ctx.body = result
        } else {
          ctx.response.status = 500;
          result.error = '008'
          result.error_description = errorCode['008']
          ctx.body = result
        }
      } else {
        ctx.response.status = 500;
        result.error = '006',
          result.error_description = errorCode['006']
        ctx.body = result
      }

    } else {
      ctx.response.status = 500;
      result.error = '017',
      result.error_description = errorCode['017']
      ctx.body = result
    }


  },


  /**
  * 验证码
  * @param  {obejct} ctx 上下文对象
  * npm install ccap --save
  */
  async pin(ctx) {

    let ary = ccap.get();
    let txt = ary[0];
    let buf = ary[1];
    let session = ctx.session;
    ctx.response.status = 200;
    ctx.body = buf;
    ctx.type = 'image/png';
    ctx.session.captcha = txt;

  },





  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象 
   * 
   * 增加，token写入
   */
  async signUp(ctx) {
    console.log('注册信息')
    console.log(ctx)

    let formData = ctx.request.body
    let result = {}


    let existOne = await userInfoService.getExistOne(formData)
 
    if (existOne) {
      if (existOne.name === formData.userName) { 
        ctx.response.status = 500;
        result.success = false
        result.error = '009',
        result.error_description = errorCode['009']
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        ctx.response.status = 500;
        result.success = false
        result.error = '013',
        result.error_description = errorCode['013']
        ctx.body = result
        return
      }
    }else{
      //token 写入

     
        const hmac = crypto.createHmac('sha256', config.secret_key)
        let nowHmac = hmac.update(Date.now().toString())
        let fHmac = nowHmac.digest('hex')
        // config.secret_key = fHmac
         console.log('token写入')
         console.log(fHmac)
 

      let userResult = await userInfoService.create({
        email: formData.email,
        token:fHmac,
        password: formData.password,
        name: formData.userName,
        create_time: new Date().getTime(),
        level: 1,
      })
  
      if (userResult && userResult.insertId * 1 > 0) {
        ctx.response.status = 200;
        result.success = true
        ctx.body = result

      } else {
        ctx.response.status = 500;
        result.success = false
        result.error = '002',
        result.error_description = errorCode['002']
        ctx.body = result
      }
  
    }

  },

  /**
   * 获取用户的token信息
   * @param    {obejct} ctx 上下文对象
   */
  async getUserToken(ctx) {

    let session = ctx.session
    console.log('测试session')
    console.log(session)
    let isLogin = session.isLogin
    let userName = session.userName
    let result = {
      success: false,
      message: '',
      data: null,
    }
    if (isLogin === true && userName) {
      let userInfo = await userInfoService.getUserInfoByUserName(userName)
      if (userInfo) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = errorCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  }


}
