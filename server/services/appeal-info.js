/**
 * 申诉业务操作
 */

const validator = require('validator')
const appealModel = require('./../models/appeal-info')
const errorCode = require('./../codes/error')

const appeal = {

  /**
   * 查询申诉总条数 
   */
  async getappealCount(){
    let resultData = await appealModel.getappealCount('appeal_info')
    return resultData
  },

   /**
   * 查找所有存在的当前用户的所有申诉
   * @param  {object} option 查找的数据  start是页码，limit是每页显示的条数。
   * @return {object|null}      查找结果
   */
  async getappealList( option ) {
    let resultData = await appealModel.getappealList({
      'start': option.start,
      'limit': option.limit
    })
    return resultData
  },

  /**
   * 查找单个申诉的数据
   * @param  {object} option 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getappealDetail( option ) {
    let resultData = await appealModel.getappealDetail({
      'appealId': option.appealId
    })
    return resultData
  },

  /**
   * 删除单个订单
   * @param  {object} option 查找的表单数据
   * @return {object|null}      查找结果
   */
  async deleteAppeal(option){
    let resultData = await appealModel.deleteAppeal({
      'appealId': option.appealId
    })
    return resultData
  },

   /**
   * 创建单个订单的申诉
   * @param  {object} order 申诉信息
   * @return {object}      创建结果
   */

  async setAppeal( option ) {
    let result = await appealModel.setAppeal(option)
    return result
  }


}

module.exports = appeal
