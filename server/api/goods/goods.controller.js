const goodsInfoService = require('./goods.service')
const errorCode = require('./../../codes/error')

module.exports = {
  /**
   * 获取商品列表
   * @param  {obejct} ctx 上下文对象
   */
  async goodsList(ctx) {

    let params = ctx.request.body,
      formData = {
        'start': params.start,
        'limit': params.limit
      };

    console.log('---------')
    console.log(ctx)
    console.log(formData)

    if (!params.start || !params.limit) {
      ctx.response.status = 500;
      ctx.body = {
        success: 0,
        message: errorCode['001']
      };
      return;
    }


    try {

      let goodsCount = await goodsInfoService.getGoodsCount(), //商品总条数
        goodsListResult = await goodsInfoService.getGoodsList(formData); //总单个条数

      if (goodsListResult) {
        ctx.response.status = 200;
        ctx.body = {
          success: 1,
          count: goodsCount[0].total_count,
          list: goodsListResult
        };

      } else {
        ctx.response.status = 500;
        ctx.body = {
          success: 0,
          message: errorCode['001']
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
   * 获取单个商品的具体详情
   */

  async goodsDetail(ctx) {
    
    let params = ctx.request.body,
      data = {
        goodsId: params.goodsId
      };

    if (!params.goodsId) {
      ctx.response.status = 500;
      ctx.body = {
        success: 0,
        message: errorCode['001']
      };
      return;
    }

    try {

      let goodsDetail = await goodsInfoService.getGoodsDetail(data);

      if (goodsDetail) {
        ctx.response.status = 200;
        ctx.body = {
          success: 1,
          list: goodsDetail
        };

      } else {
        ctx.response.status = 500;
        ctx.body = {
          success: 0,
          message: errorCode['001']
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

  }




}
