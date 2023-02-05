import fetch from './fetch';
export default {
    // 获取分类列表
    list(params) {
        return fetch.get('/category', params)
    },
    // 获取分类详情
    detail(params) {
        return fetch.get('/category/' + params.id)
    },
    // 创建分类
    create(params) {
        return fetch.post('/category', params)
    },
    // 修改分类
    update(params) {
        return fetch.put('/category/' + params.id)
    },
    // 删除分类
    delete(params) {
        return fetch.delete('/category/' + params.id)
    }
}