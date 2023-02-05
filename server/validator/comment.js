function commentValidator(ctx) {
    ctx.validateBody('nickname')
        .required('评论者昵称不能为空')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('评论内容不能为空')
        .isString()
        .trim()
    ctx.validateBody('target_id')
        .required('评论的对象文章id不能为空')
        .isString()
        .trim()
}
module.exports = { commentValidator }