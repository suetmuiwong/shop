/**
 * 用户业务操作
 */

const validator = require('validator')
const tokenModel = require('./../models/token-info')
const userCode = require('./../codes/error')



const token = {
  /**
   * 检查用户的token信息
   * @param token 当前token
   */
  async checkToken(token){
        const secret = tokenModel.GetHmac()
        console.log('checkToken')
        console.log(secret)
        //console.log('secret', secret)
        // const user = await this.findOneAndUpdate({ _id: token.id }, { app_secret: secret })
        // if(token.secret == user.app_secret){
        //     user.app_secret = secret
        //     //console.log('user user: ', user)
        //     return user
        // }else{
        //     throw new Error('token验证未通过！')
        // }
 
  },

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create( user ) {
    let result = await tokenModel.create(user)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
  
    let resultData = await tokenModel.getExistOne({
      'name': formData.userName,
      'email': formData.email,
      'password':formData.password
     
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    let resultData = await tokenModel.getOneByUserNameAndPassword({
      'password': formData.password,
      'name': formData.userName})
    return resultData
  },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    
    let resultData = await tokenModel.getUserInfoByUserName( userName ) || {}
    let userInfo = {
      // id: resultData.id,
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
  },


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = userCode.ERROR_EMAIL
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userCode.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  }

}

module.exports = token
