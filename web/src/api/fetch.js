import axios from 'axios';
import qs from 'qs';
import router from '../router';
import Vue from 'vue';
// 设置公共的url
axios.defaults.baseURL = 'http://localhost:5000/api/v1'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 获取令牌
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    // loading的开启
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 关闭loading
    return response;
}, function (error) {
    // 对响应错误做点什么
    const { response = {} } = error;
    if (response.status === 401) {
        Vue.prototype.$message.error(`${response.status}${response.statusText},请检查token`);
        localStorage.removeItem('token');
        router.push('/login')
    } else if (response.status === 404) {
        Vue.prototype.$message.error(response.data.msg)
    } else if (response.status === 500) {
        Vue.prototype.$message.error('后台出错了，请通知管理员')
    }
    // 处于pendding状态
    return new Promise(() => { });
});
// axios({})
export default {
    get(url, params = {}) {
        return axios({
            method: 'get',
            url,
            params,
            paramsSerializer: query => qs.stringify(query)
        })
    },
    post(url, params = {}) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(params)
        })
    },
    put(url, params = {}) {
        return axios({
            method: 'put',
            url,
            data: qs.stringify(params)
        })
    },
    delete(url, params = {}) {
        return axios({
            method: 'delete',
            url,
            params
        })
    }
}