import fetch from './fetch';
export default {
    // 获取文章列表
    list(params) {
        return fetch.get('/article', params)
    },
    // 获取文章详情
    detail(params) {
        return fetch.get('/article/' + params.id)
    },
    // 创建文章
    create(params) {
        return fetch.post('/article', params)
    },
    // 修改文章
    update(params) {
        return fetch.put('/article/' + params.id, params)
    },
    // 删除文章
    delete(params) {
        return fetch.delete('/article/' + params.id, params)
    }
}