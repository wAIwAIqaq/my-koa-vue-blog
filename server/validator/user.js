function registerValidator(ctx) {
    // 参数校验
    //koa-bouncer
    ctx.validateBody('nickname')
        .required('用户名是必填项')
        .isString()
        .trim()
        .isLength(3, 15, '用户必须是3~15位')
    ctx.validateBody('password')
        .required('密码是必填项')
        .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6-22位之间且包含字符、数字或下划线_');
    ctx.validateBody('password2')
        .required('再次确认密码是必填项')
        .eq(ctx.vals.password, '两次密码不一致')
    ctx.validateBody('qq')
        .required('qq是必填项')
        .trim()
    ctx.validateBody('email')
        .required('邮箱是必填项')
        .isString()
        .trim()
    ctx.body = {
        ok: 1,
        message: '用户创建成功'
    }
}
function loginValidator(ctx) {
    //   登录参数校验
    ctx.validateBody('nickname')
        .required('用户名是必填项')
        .isString()
        .trim()
        .isLength(3, 15, '用户名必须是3~15位')
    ctx.validateBody('password')
        .required('密码是必填项')
        .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6-22位之间且包含字符、数字或下划线_');//
}
module.exports = { registerValidator, loginValidator }