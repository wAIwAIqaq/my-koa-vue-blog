const UserModel = require('../models/UserModel');
const LoginManager = require('../services/userLogin');
const { registerValidator, loginValidator } = require('../validator/user');
const ArticleModel = require('../models/ArticleModel')
const { Resolve } = require('../lib/helper');
const captcha = require('trek-captcha');
const { checkCaptcha } = require('../validator/captcha');
let cptToken = '';
const res = new Resolve();
class UserController {
    // 创建用户模块
    static async createUser(ctx, next) {
        registerValidator(ctx);
        const { nickname, password } = ctx.request.body;
        ctx.request.body.cptToken = cptToken;
        checkCaptcha(ctx);
        const hasUser = await UserModel.findOne({ nickname });
        if (hasUser) {
            // 错误处理
            throw new global.errs.Existing('用户已存在');
        }
        const user = await UserModel.create(ctx.request.body)
        // 返回结果
        ctx.status = 200;
        ctx.body = res.json(user);
    }
    // 用户登录
    static async userLogin(ctx, next) {
        loginValidator(ctx);
        const userInfo = await LoginManager.userLogin(ctx.request.body);
        // 生成token
        ctx.body = res.success(userInfo)
    }
    // 获取用户信息
    static async getUserInfo(ctx, next) {
        // 经过认证中间件成功 把当前的用户信息保存在ctx.state.user中 
        // console.log(ctx.state.user.data);
        const _id = ctx.state.user.data
        const userInfo = await UserModel.findById(_id);
        if (!userInfo) {
            throw new global.errs.AuthFailed('账号不存在或密码不正确')
        }
        ctx.status = 200;
        console.log(userInfo);
        ctx.body = res.json({
            _id: userInfo._id,
            nickname: userInfo.nickname,
            cover: userInfo.cover
        })
    }
    // 用户头像上传
    static async userAvatarUpload(ctx, next) {
        const imgDestination = ctx.req.file.destination;
        const imgName = ctx.req.file.filename;
        const imgUrl = `${imgDestination.slice(14, 28)}${imgName}`
        ctx.body = res.json(imgUrl)
    }
    static async updateUserById(ctx, next) {
        const { _id } = ctx.params
        const updateUser = await UserModel.findByIdAndUpdate({ _id }, ctx.request.body);
        if (!updateUser) {
            throw new global.errs.NotFound('需要更新的用户不存在')
        }
        ctx.status = 200;
        ctx.body = res.json(updateUser);
    }
    // 获取验证码
    static async getCaptcha(ctx, next) {
        const { token, buffer } = await captcha({ size: 4 });
        //token 前端输入完验证码与此时的token做对比
        cptToken = token;
        ctx.body = buffer;
    }
}
module.exports = UserController