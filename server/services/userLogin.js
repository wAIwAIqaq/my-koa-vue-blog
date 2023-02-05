const { generateToken } = require('../core/util');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
class LoginManager {
    static async userLogin(params) {
        const { nickname, password } = params;
        // 在数据库中验证用户名和密码
        const hasUser = await UserModel.findOne({ nickname });
        if (!hasUser) {
            throw new global.errs.AuthFailed('账号不存在，或者密码不正确')
        }
        // 减盐操作
        const corret = bcrypt.compareSync(password, hasUser.password);
        if (!corret) {
            throw new global.errs.AuthFailed('账号不存在，或者密码不正确')
        }
        const token = generateToken(hasUser._id)
        return {
            nickname: hasUser.nickname,
            token,
        }
    }
}
module.exports = LoginManager;