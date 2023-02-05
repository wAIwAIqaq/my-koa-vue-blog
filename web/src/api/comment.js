import fetch from './fetch';
export default {
    // 获取评论列表
    list(params) {
        return fetch.get('/comment', params)
    },
    // 获取评论详情
    detail(params) {
        return fetch.get('/comment/' + params.id)
    },
    // 创建评论
    create(params) {
        return fetch.post('/comment', params)
    },
    // 修改评论
    update(params) {
        return fetch.put('/comment/' + params.id)
    },
    // 删除评论
    delete(params) {
        return fetch.delete('/comment/' + params.id)
    },
    targetList(params) {
        return fetch.get('/comment/target/list', params)
    }
}