const dbUtils = require('./../utils/db-util')

const order = {

  /**
   * 数据库创建商品
   * @param  {object} model 商品数据模型
   * @return {object}       mysql执行结果
   */
  async create(model) {
    let result = await dbUtils.insertData('goods_info', model)
    return result
  },

  /**
   * 获取订单列表的总条数
   * 获取未支付订单的总条数
   * 获取已支付订单的总条数
   * 
   */
  async getOrderCount(options) {

    let result = await dbUtils.count('order_info')

    return result

  },

  async getunOrderCount(options) {
    let result = await dbUtils.someCount('order_info', 'orderStatus', '1')
    return result
  },

  async gethasOrderCount(options) {
    let result = await dbUtils.someCount('order_info', 'orderStatus', '2')
    return result
  },


  /**
   * 查找所有存在订单的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getOrderList(options) {

    if (options.status == '0') {
      let result = await dbUtils.findAllDataByPage('order_info', '*', (options.start - 1), options.limit)
      return result

    } else {
      let result = await dbUtils.findDataByPage('order_info', '*', 'orderStatus', options.status, (options.start - 1), options.limit)
      return result
    }


  },

  /**
   * 查找单个订单的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getorderDetail(options) {
    let _sql = `
    SELECT * from order_info
      where orderId="${options.orderId}"
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
   * 删除单个订单
   *  @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async deleteOrder(options) {
    let result = await dbUtils.deleteDataById('order_info', 'orderId', options.orderId )
    return result

  },


  /**
   * 创建单个订单
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getGoodinfo(options) {
    let result = await dbUtils.findDataById('goods_info', 'goodsId', options)
    return result
  },
  async setOrder(options) {
    let result = await dbUtils.insertData('order_info', options)
    return result
  }

}


module.exports = order
