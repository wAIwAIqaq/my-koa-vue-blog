function checkCaptcha(ctx, next) {
    const cptToken = ctx.request.body.cptToken
    try {
        ctx.validateBody('captcha')
            .required('图形验证码不能为空')
            .isString()
            .eq(cptToken, '图形验证码输入错误')
        ctx.body = {
            ok: 1,
            message: '验证码校验成功'
        }
    } catch (error) {
        throw new global.errs.Forbidden('验证码错误')
    }
}
module.exports = { checkCaptcha }