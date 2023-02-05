const AdvertiseContorller = require('../controller/advertise');
const jwtAuth = require('koa-jwt')//认证令牌的模块
module.exports = (router) => {
    const secretKey = global.config.security.secretKey
    // 创建广告
    router.post('/advertise', jwtAuth({ secret: secretKey }), AdvertiseContorller.createAdvertise)
    // 获取广告列表
    router.get('/advertise', AdvertiseContorller.getAdvertiseList)
    // 通过Id获取广告详情
    router.get('/advertise/:_id', AdvertiseContorller.getAdvertiseDetailById)
    // 通过Id更新广告
    router.put('/advertise/:_id', jwtAuth({ secret: secretKey }), AdvertiseContorller.updateAdvertiseById)
    // 通过Id删除广告
    router.delete('/advertise/:_id', jwtAuth({ secret: secretKey }), AdvertiseContorller.deleteAdvertiseById)
}
