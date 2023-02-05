// 对密码加盐模块导入
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const mongoose = require('mongoose');
// 定义Scheme(文档结构)
const adminScheme = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: (val) => {
            //加密生成
            const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
            // 生成密码哈希值
            const psw = bcrypt.hashSync(val, salt);
            return psw;
        }
    }
})
// 定义模型
const AdminModel = mongoose.model('admin', adminScheme);
// 暴露模型
module.exports = AdminModel;