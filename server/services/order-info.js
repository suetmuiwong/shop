/**
 * 订单业务操作
 */

const validator = require('validator')
const orderModel = require('./../models/order-info')
const orderCode = require('./../codes/error')

const order = {
  /**
   * 查询订单总条数 
   * 查询未支付订单总条数
   * 查询已支付订单总条数
   */
  async getOrderCount(){
    let resultData = await orderModel.getOrderCount('order_info')
    return resultData
  },

  async getunOrderCount(){
    let resultData = await orderModel.getunOrderCount('order_info')
    return resultData
  },
  
  async gethasOrderCount(){
    let resultData = await orderModel.gethasOrderCount()
    return resultData
  },


   /**
   * 查找所有存在的订单
   * @param  {object} option 查找的数据 status是支付状态 start是页码，limit是每页显示的条数。
   * @return {object|null}      查找结果
   */
  async getOrderList( option ) {
    let resultData = await orderModel.getOrderList({
      'status':option.status,
      'start': option.start,
      'limit': option.limit
    })
    return resultData
  },

  /**
   * 查找单个订单的数据
   * @param  {object} option 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getorderDetail( option ) {
    let resultData = await orderModel.getorderDetail({
      'orderId': option.orderId
    })
    return resultData
  },

  /**
   * 删除单个订单
   * @param  {object} option 查找的表单数据
   * @return {object|null}      查找结果
   */
  async deleteOrder(option){
    let resultData = await orderModel.deleteOrder({
      'orderId': option.orderId
    })
    return resultData
  },

   /**
   * 创建单个订单
   * @param  {object} order 订单信息
   * @return {object}      创建结果
   */

   async getGoodinfo(option){
     let result = await orderModel.getGoodinfo(option)
     return result

   },
  async setOrder( option ) {
    let result = await orderModel.setOrder(option)
    return result
  }

}

module.exports = order
