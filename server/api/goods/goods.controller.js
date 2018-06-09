const goodsInfoService = require('./../services/goods-info')
const errorCode = require('./../codes/error')

module.exports = {
  /**
   * 获取商品列表
   * @param  {obejct} ctx 上下文对象
   */
  async goodsList(ctx) {

    let formData = ctx.request.body,
    token = formData.token;


    let session = ctx.session
    let result = {}

    const user = await base.checkToken(ctx, User, true)

      //token: base.signToke(user)

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {

      let params = ctx.request.body
      let formData = {
        'start': params.start,
        'limit': params.limit
      }

      let goodsCount = await goodsInfoService.getGoodsCount() //商品总条数
      let goodsListResult = await goodsInfoService.getGoodsList(formData) //总单个条数

      if (goodsListResult) {
        ctx.response.status = 200;
        result.success = true
        result.count = goodsCount[0].total_count
        result.list = goodsListResult
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
   * 获取单个商品的具体详情
   */

  async goodsDetail(ctx) {

    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body
      let data = {
        goodsId: params.goodsId
      }
      let goodsDetail = await goodsInfoService.getGoodsDetail(data)

      if (goodsDetail) {
        ctx.response.status = 200;
        result.success = true
        result.list = goodsDetail
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
