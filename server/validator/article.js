function createArticleValidator(ctx) {
    // 创建文章参数校验
    ctx.validateBody('title')
        .required('文章标题是必填项')
        .isString()
        .trim()
        .isLength(4, 20, '文章标题必须是4~20位')
    ctx.validateBody('author')
        .required('作者名是必填项')
        .isString()
        .trim()
    ctx.validateBody('description')
        .required('文章简介是必填项')
        .isString()
        .trim()
        .isLength(6, 30, '文章简介必须是6~30位')
    ctx.validateBody('keywords')
        .required('文章关键字是必填项')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('文章内容不能为空')
        .isString()
        .trim()
    ctx.validateBody('category_id')
        .required('文章分类不能为空')
        .isString()
        .trim()
    ctx.validateBody('cover')
        .required('文章封面不能为空')
        .isString()
        .trim()
    ctx.body = {
        ok: 1,
        message: '文章创建成功'
    }
}
module.exports = {
    createArticleValidator
}