const appealInfoService = require('./../services/appeal-info')
const errorCode = require('./../codes/error')



module.exports = {
  /**
   * 获取用户的所有申诉
   * @param  {obejct} ctx 上下文对象
   */
  async appealList(ctx) {

    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body
      let formData = {
        'start': params.start,
        'limit': params.limit
      }

      let appealCount = await appealInfoService.getappealCount() //申诉总条数
      let appealListResult = await appealInfoService.getappealList(formData) //申诉总单个条数

      if (appealListResult) {
        ctx.response.status = 200;
        result.success = true
        result.count = appealCount[0].total_count
        result.list = appealListResult
        ctx.body = result

      } else {
        ctx.response.status = 500;
        result.success = false
        result.error = '001'
        result.error_description = errorCode['001']
        ctx.body = result

      }
    } else {
      ctx.response.status = 500;
      result.success = false
      result.error = '003'
      result.error_description = errorCode['003']
      ctx.body = result
    }

  },

  /**
   * 获取单个订单申诉的具体详情
   * @param  {obejct} ctx 上下文对象
   */

  async appealDetail(ctx) {
    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body
      let data = {
        appealId: params.appealId
      }

      let appealDetail = await appealInfoService.getappealDetail(data)

      if (appealDetail) {
        ctx.response.status = 200;
        result.success = true
        result.data = appealDetail
        ctx.body = result

      } else {
        ctx.response.status = 500;
        result.success = false
        result.error = '001'
        result.error_description = errorCode['001']
        ctx.body = result
      }
    } else {
      ctx.response.status = 500;
      result.success = false
      result.error = '003'
      result.error_description = errorCode['003']
      ctx.body = result
    }

  },

  /**
   * 删除单个申诉信息
   * @param  {obejct} ctx 上下文对象
   */
  async deleteAppeal(ctx) {
    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body;
      let data = {
        appealId: params.appealId
      }
      let deleteAppeal = await appealInfoService.deleteAppeal(data)
      if (deleteAppeal) {
        if (deleteAppeal.affectedRows == '1') { //判断是否删除成功
          ctx.response.status = 200;
          result.success = true
          result.data = {
            del_status: 1  //	0 删除不成功 1 删除成功
          }
          ctx.body = result
        } else {
          ctx.response.status = 200;
          result.success = true
          result.data = {
            del_status: 0 //	0 删除不成功 1 删除成功
          }
          ctx.body = result
        }
      } else {
        ctx.response.status = 500;
        result.success = false
        result.error = '001'
        result.error_description = errorCode['001']
        ctx.body = result
      }
    } else {
      ctx.response.status = 500;
      result.success = false
      result.error = '003'
      result.error_description = errorCode['003']
      ctx.body = result
    }

  },

  /**
   * 创建单个申诉信息
   * @param  {obejct} ctx 上下文对象
   */

  async setAppeal(ctx) {
    let session = ctx.session
    let result = {}
    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body;
      let data = {
        appealOrder: params.appealOrder,
        appealType: params.appealType,
        appealDes: params.appealDes,
        appealManageStatus: params.appealManageStatus,
        appealContact: params.appealContact,
      }

      // 获取当前的时间戳
      var timestamp = new Date().getTime()
      var optionData = {
        appealTime: timestamp,
        appealOrder: data.appealOrder,
        appealType: data.appealType,
        appealDes: data.appealDes,
        appealManageStatus: data.appealManageStatus,
        appealContact: data.appealContact,
      }

      let setAppeal = await appealInfoService.setAppeal(optionData)

      if (setAppeal) {
        ctx.response.status = 200;
        result.success = true
        result.data = {
          appealId: setAppeal.insertId
        }
        ctx.body = result

      } else {
        ctx.response.status = 500;
        result.success = false
        result.error = '001'
        result.error_description = errorCode['001']
        ctx.body = result
      }
    } else {
      ctx.response.status = 500;
      result.success = false
      result.error = '003'
      result.error_description = errorCode['003']
      ctx.body = result
    }

  }

}
