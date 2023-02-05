function replyValidator(ctx) {
    ctx.validateBody('nickname')
        .required('回复者昵称不能为空')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('回复内容不能为空')
        .isString()
        .trim()
    ctx.validateBody('comment_id')
        .required('回复的对象评论id不能为空')
        .isString()
        .trim()
}
module.exports = { replyValidator }