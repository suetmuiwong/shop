const dbUtils = require('./../utils/db-util')

//添加token
const jwt = require('jsonwebtoken')

const user = {

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

    return token

  },

  /**
   * 检查并更新token
   * @param 
   */

  async checkToken(ctx, User, getUser) {
    const token = ctx.state.user // 获取jwt 
    if (token) {
      const user = await User.checkToken(token)
      if (user) {
        if (getUser) {
          return user
        } else {
          return this.signToke(user)
        }
      } else {
        ctx.throw(501, 'token信息异常')
      }
    } else {
      ctx.throw(404, 'token丢失')
    }
  },
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





  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create(model) {
    let result = await dbUtils.insertData('user_info', model)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options) {

    let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(options) {
    let _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.name}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {

    let result = await dbUtils.select(
      'user_info',
      ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time'])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },



}


module.exports = user
