const { generateToken } = require('../core/util');
const AdminModel = require('../models/AdminModel');
const bcrypt = require('bcrypt');
class LoginManager {
    static async adminLogin(params) {
        const { nickname, password } = params;
        // 在数据库中验证用户名和密码
        const adminUser = await AdminModel.findOne({ nickname });
        if (!adminUser) {
            throw new global.errs.AuthFailed('账号不存在，或者密码不正确')
        }
        const corret = bcrypt.compareSync(password, adminUser.password);
        if (!corret) {
            throw new global.errs.AuthFailed('账号不存在，或者密码不正确')
        }
        const token = generateToken(adminUser._id)
        return {
            nickname: adminUser.nickname,
            token
        }
    }
}
module.exports = LoginManager;