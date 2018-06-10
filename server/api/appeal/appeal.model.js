const dbUtils = require('./../../utils/db-util')

const appeal = {


  /**
   * 获取申诉列表的总条数
   * 
   */
  async getappealCount(options) {
    let result = await dbUtils.count('appeal')
    return result

  },

  /**
   * 查找所有存在申诉的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getappealList(options) {

    let result = await dbUtils.findAllDataByPage('appeal', '*', (options.start - 1), options.limit)
    return result
  },

  /**
   * 查找单个申诉的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getappealDetail(options) {
    let _sql = `
    SELECT * from appeal
      where appealId="${options.appealId}"
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
   * 删除单个申诉
   *  @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async deleteAppeal(options) {
    let result = await dbUtils.deleteDataById('appeal', 'appealId', options.appealId )
    return result

  },

  /**
   * 创建单个订单的申诉
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */

  async setAppeal(options) {
    let result = await dbUtils.insertData('appeal', options)
    return result
  }

}


module.exports = appeal
