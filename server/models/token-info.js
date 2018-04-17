const dbUtils = require('./../utils/db-util')

//添加token
const jwt = require('jsonwebtoken')
//加密
const config = require('../../config')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const token = {

/**
 * token加密
 */
async GetHmac(){
    const hmac = crypto.createHmac('sha256', config.secret_key)
    hmac.update(Date.now().toString())
    return hmac.digest('hex')
},


  /**
  * 生成token
  * @param user 当前用户
  */
  async signToke(user) {
    console.log('测试1233')
    console.log(user)

    const token = jwt.sign({
      id: user._id,
      secret: user.app_secret
    }, config.jwt_secret, { expiresIn: 3600 })
    console.log(token)
    return token

  },

  /**
   * 检查token
   * @param token 需要检查的token
   */

  async checkToken(token) {

    let _sql = `SELECT * from user_info where email="${token}"limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

   /**
   * 更新token
   * @param 
   */


  //生成token
  // function signToke(user){
  //     const token = jwt.sign({
  //         id: user._id,
  //         secret: user.app_secret
  //     }, config.jwt_secret, {expiresIn: 3600})
  //     return token
  // }

  // //检查并更新token
  // async function checkToken(ctx, User, getUser){
  //     const token = ctx.state.user // 获取jwt 
  //     if(token) {
  //       const user = await User.checkToken(token)
  //       if(user){
  //           if(getUser){
  //               return user
  //           }else{
  //             return this.signToke(user)
  //           }
  //       }else{
  //         ctx.throw(501, 'token信息异常')
  //       }
  //     } else {
  //       ctx.throw(404, 'token丢失')
  //     }
  // }

  // module.exports = {
  //     signToke : signToke,
  //     checkToken: checkToken
  // }


}


module.exports = token
