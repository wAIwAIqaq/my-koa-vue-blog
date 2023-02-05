class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg;
    }
}
// 412 已存在
class Existing extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 412;
        this.msg = msg || '已存在';
        this.errorCode = errorCode || 10006;
    }
}
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 404;
        this.msg = msg || '404找不到页面';
        this.errorCode = errorCode || 10005;
    }
}
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 401;
        this.msg = msg || '401认证失败';
        this.errorCode = errorCode || 10004;
    }
}
class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 403;
        this.msg = msg || '403禁止访问';
        this.errorCode = errorCode || 10004;
    }
}
module.exports = {
    HttpException,
    Existing,
    NotFound,
    AuthFailed,
    Forbidden
}