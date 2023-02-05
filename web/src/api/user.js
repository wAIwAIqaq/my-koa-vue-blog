import fetch from './fetch';
export default {
    // 登录获取用户详情
    login(params) {
        return fetch.post('/user/login', params)
    },
    // 权限认证
    auth(params) {
        return fetch.get('/user/auth', params)
    },
    register(params) {
        return fetch.post('/user/register', params)
    }
}