const CategoryController = require('../controller/category')
const jwtAuth = require('koa-jwt');
module.exports = (router) => {
    const secretKey = global.config.security.secretKey;
    // 创建分类接口
    router.post('/category', CategoryController.createCategory)
    // 获取所有分类
    router.get('/category', CategoryController.getCategoryList)
    // 更改分类
    router.put('/category/:_id', jwtAuth({ secret: secretKey }), CategoryController.updateCategoryById)
    // 获取分类详情
    router.get('/category/:_id', CategoryController.getCategoryDetailById)
    // 删除分类
    router.delete('/category/:_id', jwtAuth({ secret: secretKey }), CategoryController.deleteCategoryById)
}