const AdminController = require('../controller/admin');
const jwtAuth = require('koa-jwt')//认证令牌的模块
module.exports = (router) => {
    router.prefix('/api/v1')
    // 注册一个管理员
    router.post('/admin/register', AdminController.createAdmin)
    // 登录操作 restful api
    router.post('/admin/login', AdminController.login)
    // 认证接口 get 请求头携带token 获取管理员信息
    router.get('/admin/auth', jwtAuth({ secret: global.config.security.secretKey }), AdminController.getUserInfo);
}
