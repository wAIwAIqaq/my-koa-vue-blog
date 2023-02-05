// 对密码加盐模块导入
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const mongoose = require('mongoose');
// 定义Scheme(文档结构)
const userScheme = new mongoose.Schema({
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
    },
    cover: {
        type: String,
        required: false,
    },
    qq: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    article_count: {
        type: Number,
        required: false,
        default: 0,
    }
})
// 定义模型
const UserModel = mongoose.model('User', userScheme);
// 暴露模型
module.exports = UserModel;