/**
 * 文档错误码
 */

const errorCode = {
  '000':'请求成功',
  '001':'参数不合法',
  '002':'服务器出错',
  '003':'没有用户登录',
  '004':'登录时的token不合法',
  '005':'登录状态已经过期，需要重新登录',
  '006':'用户不存在',
  '007':'密码错误',
  '008':'用户名或密码错误',
  '009':'用户已经存在了',
  '010':'发送邮件失败',
  '011':'邮箱格式错误',
  '012':'手机号码格式错误',
  '013':'该邮箱已被其他用户使用',
  '014':'该手机号码已被其他用户使用',
  '015':'绑定邮箱或通过邮箱找回密码的token错误或已经失效了',
  '016':'绑定邮箱或通过邮箱找回密码的验证码错误或已经过期了',
  '017':"验证码错误"


}


module.exports = errorCode
