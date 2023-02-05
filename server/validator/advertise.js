function createAdvertiseValidator(ctx) {
    ctx.validateBody('title')
        .required('广告标题是必须的')
        .toString()
        .trim()
    ctx.validateBody('link')
        .required('广告链接是必须的')
        .toString()
        .trim()
}
module.exports = { createAdvertiseValidator }