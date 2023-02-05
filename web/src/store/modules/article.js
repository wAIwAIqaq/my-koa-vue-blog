import article from '../../api/articles'
const state = {
    articleList: [],
};
const mutations = {
};
const actions = {
    // 获取文章列表
    async list({ commit, state }, params) {
        if (state.articleList && state.articleList.length > 0) {
            return state.articleList;
        }
        console.log(params);
        let res = await article.list(params);
        console.log(res);
        return res;
    },
    // 获取文章详情
    async detail({ commit, state }, params) {
        const res = await article.detail(params);
        return res
    },
    async createArticle({ commit, state }, params) {
        const res = await article.create(params);
        return res
    }
}
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}