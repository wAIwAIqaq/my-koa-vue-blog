const jwt = require('jsonwebtoken');
// 分发令牌 token
const generateToken = function (_id) {
    // 签名认证生成token
    const token = jwt.sign({
        exp: global.config.security.exp,
        data: _id,
    }, global.config.security.secretKey)
    return token
}
module.exports = {
    generateToken
}