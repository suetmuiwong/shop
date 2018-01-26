const userInfoService = require('./../services/user-info')
const errorCode = require('./../codes/error')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */


  async signIn(ctx) {
    let formData = ctx.request.body

  
    let result = {}
    let userResult = await userInfoService.signIn(formData)
    if (userResult) {
      if (formData.userName === userResult.name) {
        ctx.response.status = 200;
        result.success = true
        let session = ctx.session
        session.isLogin = true
        session.userName = userResult.name
        session.userId = userResult.id
       
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


  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp(ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp(formData)

    if (validateResult.success === false) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne = await userInfoService.getExistOne(formData)
    console.log(existOne)

    if (existOne) {
      if (existOne.name === formData.userName) {
        result.message = errorCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.message = errorCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }


    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1,
    })

    console.log(userResult)

    if (userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = errorCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo(ctx) {


    
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName
    console.log('*****************************888')
    console.log('session=', session)

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
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin(ctx) {
    let result = {
      success: false,
      message: errorCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    }
    let session = ctx.session
    console.log(session)
    if (session && session.isLogin === true) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  }


}
