import fetch from './fetch';
export default {
    // 获取广告列表
    list(params) {
        return fetch.get('/adevertise', params)
    },
    // 获取广告详情
    detail(params) {
        return fetch.get('/adevertise/' + params.id)
    },
    // 创建广告
    create(params) {
        return fetch.post('/adevertise', params)
    },
    // 修改广告
    update(params) {
        return fetch.put('/adevertise/' + params.id, params)
    },
    // 删除广告
    delete(params) {
        return fetch.delete('/adevertise/' + params.id, params)
    }
}