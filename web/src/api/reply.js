import fetch from './fetch';
export default {
    // 获取回复列表
    list(params) {
        return fetch.get('/reply', params)
    },
    // 获取回复详情
    detail(params) {
        return fetch.get('/reply/' + params.id)
    },
    // 创建回复
    create(params) {
        return fetch.post('/reply', params)
    },
    // 修改回复
    update(params) {
        return fetch.put('/reply/' + params.id)
    },
    // 删除回复
    delete(params) {
        return fetch.delete('/reply/' + params.id)
    }
}