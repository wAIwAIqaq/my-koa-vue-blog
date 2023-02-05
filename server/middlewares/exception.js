const KoaBouncer = require('koa-bouncer');
const { HttpException } = require('../core/http-exception');
const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.log(error);
        // 参数错误 
        if (error instanceof KoaBouncer.ValidationError) {
            console.log(error);
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                name: error.name,
                msg: error.message,
            }
            return
        }
        // 权限错误 401
        if (error.status === 401) {
            ctx.status = 401;
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                errorCode: error.status,
                msg: {
                    error: error.originalError ? error.originalError.message : error.message,
                    '请求错误:': '请求头中需要携带token才能进行此操作'
                }
            }
            return
        }
        const isHttpException = error instanceof HttpException;
        if (isHttpException) {
            //    设置状态码
            ctx.status = error.code;
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                msg: error.msg,
                error_code: error.errorCode,
            }
        } else {
            ctx.status = 500;
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                msg: '未知错误',
                error_code: 9999,
            }
        }
    }
}
module.exports = catchError