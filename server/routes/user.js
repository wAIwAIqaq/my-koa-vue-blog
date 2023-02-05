const UserController = require('../controller/user');
const jwtAuth = require('koa-jwt');//认证令牌的模块
module.exports = (router) => {
  const secretKey = global.config.security.secretKey;
  // 注册一个用户
  router.post('/user/register', UserController.createUser)
  // 用户登录
  router.post('/user/login', UserController.userLogin)
  // 获取用户详情
  router.get('/user/auth', jwtAuth({ secret: secretKey }), UserController.getUserInfo)
  // 更新用户信息
  router.put('/user/:_id', jwtAuth({ secret: secretKey }), UserController.updateUserById)
  //用户上传头像
  router.post('/user/upload', UserController.userAvatarUpload)
  // 注册获取验证码
  router.get('/captcha', UserController.getCaptcha)
  // 校验验证码
}
