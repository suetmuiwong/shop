const appealInfoService = require('./appeal.service')
const errorCode = require('./../../codes/error')



module.exports = {
    /**
     * 获取用户的所有申诉
     * @param  {obejct} ctx 上下文对象
     */
    async appealList(ctx) {

        let params = ctx.request.body,
            formData = {
                'start': params.start,
                'limit': params.limit
            };

        if (!params.start || !params.limit) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }

        try {

            let appealCount = await appealInfoService.getappealCount(),//申诉总条数
                appealListResult = await appealInfoService.getappealList(formData) //申诉总单个条数

            if (appealListResult) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    count: appealCount[0].total_count,
                    list: appealListResult
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
     * 获取单个订单申诉的具体详情
     * @param  {obejct} ctx 上下文对象
     */

    async appealDetail(ctx) {
        let params = ctx.request.body,
            data = {
                appealId: params.appealId
            };

        if (!params.appealId) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }

        try {

            let appealDetail = await appealInfoService.getappealDetail(data);

            if (appealDetail) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    data: appealDetail
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
     * 删除单个申诉信息
     * @param  {obejct} ctx 上下文对象
     */
    async deleteAppeal(ctx) {

        let params = ctx.request.body,
            data = {
                appealId: params.appealId
            };

        if (!params.appealId) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }

        try {

            let deleteAppeal = await appealInfoService.deleteAppeal(data)
            if (appealDetail) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    data: appealDetail
                };

                if (deleteAppeal.affectedRows == '1') { //判断是否删除成功
                    ctx.response.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            del_status: 1  //	0 删除不成功 1 删除成功
                        }
                    };
                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            del_status: 0  //	0 删除不成功 1 删除成功
                        }
                    };
                }

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
     * 创建单个申诉信息
     * @param  {obejct} ctx 上下文对象
     */

    async setAppeal(ctx) {
        let params = ctx.request.body,
        data = {
            appealOrder: params.appealOrder,
            appealType: params.appealType,
            appealDes: params.appealDes,
            appealManageStatus: params.appealManageStatus,
            appealContact: params.appealContact,
        }

        if (!params.appealOrder || !params.appealType ||params.appealDes || params.appealManageStatus || params.appealContact  ) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
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

        try {

            let setAppeal = await appealInfoService.setAppeal(optionData);
            if (setAppeal) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    data:  {
                        appealId: setAppeal.insertId
                    }
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
