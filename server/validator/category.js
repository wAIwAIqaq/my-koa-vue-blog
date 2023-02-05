function categoryValidator(ctx) {
    ctx.validateBody('name')
        .required('分类名不能为空')
        .isString()
        .trim()
    ctx.validateBody('keywords')
        .isString()
        .trim()
}
module.exports = { categoryValidator }