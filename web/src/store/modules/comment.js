import comment from '../../api/comment'
const state = {
    commentList: [],
    commentPage: null,
};
const mutations = {
    // 设置评论列表
    SET_COMMENT_LIST(state, list) {
        state.commentList = list;
    },
    SET_COMMENT_PAGE(state, data) {
        state.commentPage = data;
    }
};
const actions = {
    async createComment({ commit }, params) {
        return await comment.create(params);
    },
    // 获取文章下的评论列表
    async getTargetComments({ commit }, params) {
        return await comment.targetList(params)
    }
}
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}