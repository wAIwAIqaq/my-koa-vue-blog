const ReplyController = require('../controller/reply')
const jwtAuth = require('koa-jwt');
module.exports = (router) => {
    const secretKey = global.config.security.secretKey;
    // 创建回复
    router.post('/reply', jwtAuth({ secret: secretKey }), ReplyController.createReply)
    // 获取所有回复
    router.get('/reply', ReplyController.getReplyListByCommentId)
    // 回复详情
    router.get('/reply/:_id', ReplyController.getReplyDetailById)
    // 更新回复
    router.put('/reply/:_id', jwtAuth({ secret: secretKey }), ReplyController.updateReplyById)
    // 删除回复
    router.delete('/reply/:_id', jwtAuth({ secret: secretKey }), ReplyController.deleteReplyById)
}