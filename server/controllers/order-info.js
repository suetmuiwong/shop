const orderInfoService = require('./../services/order-info')
const errorCode = require('./../codes/error')

module.exports = {
  /**
   * 获取订单总数订单列表，总订单，未支付，已支付
   * @param  {obejct} ctx 上下文对象
   */
  async orderList(ctx) {

    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {

      let params = ctx.request.body
      let formData = {
        'status': params.status,
        'start': params.start,
        'limit': params.limit
      }

      let orderCount
      let orderListResult

      switch (params.status) {
        case '0': //全部订单
          orderCount = await orderInfoService.getOrderCount() //商品总条数
          orderListResult = await orderInfoService.getOrderList(formData) //总单个条数

          if (orderListResult) {
            ctx.response.status = 200;
            result.success = true
            result.count = orderCount[0].total_count
            result.list = orderListResult
            ctx.body = result

          } else {
            ctx.response.status = 500;
            result.success = false
            result.error = '001'
            result.error_description = errorCode['001']
            ctx.body = result

          }
          break;
        case '1': //未支付
          orderCount = await orderInfoService.getunOrderCount() //商品总条数
          orderListResult = await orderInfoService.getOrderList(formData) //总单个条数

          if (orderListResult) {
            ctx.response.status = 200;
            result.success = true
            result.count = orderCount[0].total_count
            result.list = orderListResult
            ctx.body = result

          } else {
            ctx.response.status = 500;
            result.success = false
            result.error = '001'
            result.error_description = errorCode['001']
            ctx.body = result

          }
          break;
        case '2': //已支付
          orderCount = await orderInfoService.gethasOrderCount() //商品总条数
          orderListResult = await orderInfoService.getOrderList(formData) //总单个条数

          if (orderListResult) {
            ctx.response.status = 200;
            result.success = true
            result.count = orderCount[0].total_count
            result.list = orderListResult
            ctx.body = result

          } else {
            ctx.response.status = 500;
            result.success = false
            result.error = '001'
            result.error_description = errorCode['001']
            ctx.body = result

          }
          break;
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
   * 获取单个订单的具体详情
   * @param  {obejct} ctx 上下文对象
   */

  async orderDetail(ctx) {
    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
      let params = ctx.request.body
      let data = {
        orderId: params.orderId
      }
      let orderDetail = await orderInfoService.getorderDetail(data)

      if (orderDetail) {
        ctx.response.status = 200;
        result.success = true
        result.data = orderDetail
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
   * 删除单个订单
   * @param  {obejct} ctx 上下文对象
   */
  async deleteOrder(ctx) {
    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {

      let params = ctx.request.body;
      let data = {
        orderId: params.orderId
      }
      let deleteOrder = await orderInfoService.deleteOrder(data)
      if (deleteOrder) {
        if (deleteOrder.affectedRows == '1') {
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
   * 创建单个订单
   * @param  {obejct} ctx 上下文对象
   */

  async setOrder(ctx) {
    let session = ctx.session
    let result = {}

    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {

      let params = ctx.request.body;
      let data = {
        goodsId: params.goodsId,
        goodsCount: params.goodsCount,
        totalMoney: params.totalMoney,
        realTotalMoney: params.realTotalMoney,
      }

      // 获取当前的时间戳
      var timestamp = new Date().getTime()
      // 订单号规范 时间戳+商品id
      var orderNo = timestamp + data.goodsId

      //查询当前创建订单的商品的详情信息
      let goodInfo = await orderInfoService.getGoodinfo(data.goodsId);
      var optionData = {
        orderNo: orderNo,
        orderStatus: '1',
        totalMoney: data.totalMoney,
        realTotalMoney: data.realTotalMoney,
        goodsName: goodInfo[0].goodsName,
        goodsImage: goodInfo[0].goodsImage,
        goodsBrief: goodInfo[0].goodsBrief,
        goodsCount: data.goodsCount,
        orderTime: timestamp,
        payType: '1'
      }

      let setOrder = await orderInfoService.setOrder(optionData)

      if (setOrder) {
        ctx.response.status = 200;
        result.success = true
        result.data = {
          orderId: setOrder.insertId
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
