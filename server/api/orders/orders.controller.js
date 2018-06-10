const orderInfoService = require('./orders.service')
const errorCode = require('./../../codes/error')

module.exports = {
    /**
     * 获取订单总数订单列表，总订单，未支付，已支付
     * @param  {obejct} ctx 上下文对象
     */
    async orderList(ctx) {

        let params = ctx.request.body,
            formData = {
                'status': params.status,
                'start': params.start,
                'limit': params.limit
            }

        if (!params.status || !params.start || !params.limit) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }


        try {

            let orderCount
            let orderListResult
            switch (params.status) {
                case '0': //全部订单
                    orderCount = await orderInfoService.getOrderCount() //商品总条数
                    orderListResult = await orderInfoService.getOrderList(formData) //总单个条数
                    if (orderListResult) {
                        ctx.response.status = 200;
                        ctx.body = {
                            success: 1,
                            count: orderCount[0].total_count,
                            list: orderListResult
                        };

                    } else {
                        ctx.response.status = 500;
                        ctx.body = {
                            success: 0,
                            message: errorCode['001']
                        };

                    }
                    break;
                case '1': //未支付
                    orderCount = await orderInfoService.getunOrderCount() //商品总条数
                    orderListResult = await orderInfoService.getOrderList(formData) //总单个条数

                    if (orderListResult) {
                        ctx.response.status = 200;
                        ctx.body = {
                            success: 1,
                            count: orderCount[0].total_count,
                            list: orderListResult
                        };

                    } else {
                        ctx.response.status = 500;
                        ctx.body = {
                            success: 0,
                            message: errorCode['001']
                        };

                    }
                    break;
                case '2': //已支付
                    orderCount = await orderInfoService.gethasOrderCount() //商品总条数
                    orderListResult = await orderInfoService.getOrderList(formData) //总单个条数

                    if (orderListResult) {
                        ctx.response.status = 200;
                        ctx.body = {
                            success: 1,
                            count: orderCount[0].total_count,
                            list: orderListResult
                        };

                    } else {
                        ctx.response.status = 500;
                        ctx.body = {
                            success: 0,
                            message: errorCode['001']
                        };

                    }
                    break;
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
     * 获取单个订单的具体详情
     * @param  {obejct} ctx 上下文对象
     */

    async orderDetail(ctx) {


        let params = ctx.request.body,
            data = {
                orderId: params.orderId
            }

        if (!params.orderId) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }


        try {
            let orderDetail = await orderInfoService.getorderDetail(data)

            if (orderDetail) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    data: orderDetail
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
     * 删除单个订单
     * @param  {obejct} ctx 上下文对象
     */
    async deleteOrder(ctx) {

        let params = ctx.request.body,
            data = {
                orderId: params.orderId
            }

        if (!params.orderId) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }

        try {
            let deleteOrder = await orderInfoService.deleteOrder(data);

            if (deleteOrder) {
                if (deleteOrder.affectedRows == '1') {
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
     * 创建单个订单
     * @param  {obejct} ctx 上下文对象
     */

    async setOrder(ctx) {


        let params = ctx.request.body,
            data = {
                goodsId: params.goodsId,
                goodsCount: params.goodsCount,
                totalMoney: params.totalMoney,
                realTotalMoney: params.realTotalMoney,
            }

        if (!params.goodsId || params.goodsCount || params.totalMoney || params.realTotalMoney) {
            ctx.response.status = 500;
            ctx.body = {
                success: 0,
                message: errorCode['001']
            };
            return;
        }

        // 获取当前的时间戳
        let timestamp = new Date().getTime()
        // 订单号规范 时间戳+商品id
        let orderNo = timestamp + data.goodsId

        //查询当前创建订单的商品的详情信息
        let goodInfo = await orderInfoService.getGoodinfo(data.goodsId),
            optionData = {
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
            };


        try {
            let setOrder = await orderInfoService.setOrder(optionData)

            if (setOrder) {
                ctx.response.status = 200;
                ctx.body = {
                    success: 1,
                    orderId: setOrder.insertId
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
