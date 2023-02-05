const CommentController = require('../controller/comment')
const jwtAuth = require('koa-jwt');
module.exports = (router) => {
    const secretKey = global.config.security.secretKey;
    // 创建评论
    router.post('/comment', CommentController.createComment)
    // 获取所有评论
    router.get('/comment', CommentController.getCommentList)
    // 评论详情
    router.get('/comment/:_id', CommentController.getCommentDetailById)
    // 更新评论
    router.put('/comment/:_id', jwtAuth({ secret: secretKey }), CommentController.updateCommentById)
    // 删除评论
    router.delete('/comment/:_id', jwtAuth({ secret: secretKey }), CommentController.deleteCommentById)
    router.get('/comment/target/list/', CommentController.getTargetComments)
}