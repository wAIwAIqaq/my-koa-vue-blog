// 帮助类
class Resolve {
    json(data, msg = 'success', code = 200, errorCode = 0) {
        return {
            code,
            msg,
            errorCode,
            data
        }
    }
    success(msg = 'success', errorCode = 200, code = 200) {
        return {
            msg,
            errorCode,
            code
        }
    }
}
module.exports = { Resolve }