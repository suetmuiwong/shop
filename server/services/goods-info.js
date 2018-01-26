/**
 * 商品业务操作
 */

const validator = require('validator')
const goodsModel = require('./../models/goods-info')
const goodsCode = require('./../codes/error')

const goods = {

  /**
   * 创建商品
   * @param  {object} goods 商品信息
   * @return {object}      创建结果
   */
  async create( goods ) {
    let result = await goodsModel.create(goods)
    return result
  },

  /**
   * 查询商品总条数
   */
  async getGoodsCount(){
    let resultData = await goodsModel.getGoodsCount('goods_info')
    return resultData
  },


   /**
   * 查找所有存在的商品
   * @param  {object} option 查找的数据 start是页码，limit是每页显示的条数。
   * @return {object|null}      查找结果
   */
  async getGoodsList( option ) {
    let resultData = await goodsModel.getGoodsList({
      'start': option.start,
      'limit': option.limit
    })
    return resultData
  },


  /**
   * 查找单个商品的数据
   * @param  {object} option 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getGoodsDetail( option ) {
    let resultData = await goodsModel.getGoodsDetail({
      'goodsId': option.goodsId
    })
    return resultData
  }



 

}

module.exports = goods
