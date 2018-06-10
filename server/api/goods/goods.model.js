const dbUtils = require('./../../utils/db-util')

const goods = {

  /**
   * 数据库创建商品
   * @param  {object} model 商品数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( 'goods', model )
    return result
  },

  /**
   * 获取商品列表的总条数
   */
async getGoodsCount(options){
   
  let result = await dbUtils.count('goods')
  return result

},


  /**
   * 查找所有存在商品的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getGoodsList(options ) {

    let result = await dbUtils.findAllDataByPage('goods','*', (options.start-1), options.limit)
    return result
  },

 


  /**
   * 查找单个商品的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getGoodsDetail(options ) {
    let _sql = `
    SELECT * from goods
      where goodsId="${options.goodsId}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }


}


module.exports = goods
