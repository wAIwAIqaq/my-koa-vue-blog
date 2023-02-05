const AdminModel = require('../models/AdminModel');
const LoginManager = require('../services/adminLogin');
const { registerValidator, loginValidator } = require('../validator/admin');
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class AdminContorller {
    // 管理员注册
    static async createAdmin(ctx, next) {
        registerValidator(ctx);
        // 获取请求体的数据
        const { nickname, password } = ctx.request.body;
        const hasAdminUser = await AdminModel.findOne({ nickname });
        if (hasAdminUser) {
            // 错误处理
            throw new global.errs.Existing('管理员已存在');
        }
        // 存储到数据库管理员模型中
        const admin = await AdminModel.create({
            nickname,
            password
        })
        // 返回结果
        ctx.status = 200;
        ctx.body = res.json(admin);
    }
    static async login(ctx, next) {
        //登录参数验证
        loginValidator(ctx);
        const userInfo = await LoginManager.adminLogin(ctx.request.body);
        // 生成token
        ctx.body = res.success(userInfo)
    }
    // 认证获取管理员的信息
    static async getUserInfo(ctx, next) {
        // 经过认证中间件成功 把当前的用户信息保存在ctx.state.user中 
        // console.log(ctx.state.user.data);
        const _id = ctx.state.user.data
        const userInfo = await AdminModel.findById(_id);
        if (!userInfo) {
            throw new global.errs.AuthFailed('账号不存在或密码不正确')
        }
        ctx.status = 200;
        ctx.body = res.json({
            _id: userInfo._id,
            nickname: userInfo.nickname,
        })
    }
}
module.exports = AdminContorller