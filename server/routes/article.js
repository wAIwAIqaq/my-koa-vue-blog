const ArticleController = require('../controller/article');
const upload = require('../middlewares/articleUpload');
const jwtAuth = require('koa-jwt');
module.exports = router => {
    // 用户认证
    // 创建文章
    router.post('/article', jwtAuth({ secret: global.config.security.secretKey }), ArticleController.createArticle)
    // 获取文章列表
    router.get('/article', ArticleController.getArticleList)
    // 更新文章
    router.put('/article/:_id', jwtAuth({ secret: global.config.security.secretKey }), ArticleController.updateArticle)
    // 获取文章详情
    router.get('/article/:_id', jwtAuth({ secret: global.config.security.secretKey }), ArticleController.getArticleDetailById)
    // 删除文章
    router.delete('/article/:_id', jwtAuth({ secret: global.config.security.secretKey }), ArticleController.deleteArticleById)
    router.post('/article/upload', upload.single('cover'), ArticleController.uploadCoverImg)
}