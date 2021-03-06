const moment = require('moment');
const jwt = require('jsonwebtoken');
const helper = require('./../../utils/helper');
const config = require('./../../config/environment');

const userInfoService = require('./user.service')
const errorCode = require('./../../codes/error')
const ccap = require('ccap')();

//加密
const bcrypt = require('bcrypt');
const crypto = require('crypto');



module.exports = {

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
   * 登录
   * @param  {obejct} ctx 上下文对象 
   */

  async signIn(ctx) {

    let formData = ctx.request.body,
    userName = formData.userName,
    password = formData.password;


  if (!userName || !password) {
    ctx.response.status = 500;
    ctx.body = {
      success: 0,
      message:errorCode['001']  
    };
    return;
  }

  try {
    //let results = await ctx.execSql(`SELECT id, hashedPassword, salt FROM user WHERE role='ADMIN' and userName = ?`, userName);
    
    let results = await userInfoService.signIn(formData)
    if (results) {
      let hashedPassword = results.hashedPassword,
        salt = results.salt,
        hashPassword = helper.encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        ctx.session.user = userName;
        // 用户token
        const userToken = {
          name: userName,
          id: results.id
        };
        // 签发token
        const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '600h' });
        
        ctx.response.status = 200;
        ctx.body = {
          success: 1,
          token: token,
          message:errorCode['000']
        };
      } else {
        ctx.response.status = 500;
        ctx.body = {
          success: 0,
          message: errorCode['008']
        };
      }
    } else {
      ctx.response.status = 500;
      ctx.body = {
        success: 0,
        message: errorCode['008']
      };
    }
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.body = {
      success: 0,
      message: errorCode['002']
    };
  }

  },


  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象 
   * 
   * 增加，token写入
   */
  async signUp(ctx) {
 
    let formData = ctx.request.body,
    userName = formData.userName,
    password = formData.password;

    if (!userName || !password) {
      ctx.response.status = 500;
      ctx.body = {
        success: 0,
        message:errorCode['001']  
      };
      return;
    }
   
    try {

    let existOne = await userInfoService.getExistOne(formData)

    if (existOne) {
      if (existOne.userName === formData.userName) {
        ctx.response.status = 500;
        ctx.body = {
          success: 0,
          message: errorCode['009']
        };
        return
      }
 
    } else {

      let salt = helper.makeSalt();
      let hashedPassword = helper.encryptPassword(password, salt);
      let userResult = await userInfoService.create({
          userName: userName,
          hashedPassword: hashedPassword,
          salt: salt,
          role: '',
          createTime: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      if (userResult && userResult.insertId * 1 > 0) {
        ctx.response.status = 200;
        ctx.body = {
          success: 1,
          message: errorCode['000']
        };

      } else {
        ctx.response.status = 500;
        ctx.body = {
          success: 0,
          message: errorCode['002']
        };
      }

    }
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.body = {
      success: 0,
      message: errorCode['002']
    };
  }

  }



}






