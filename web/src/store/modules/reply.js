import reply from '../../api/reply'
const state = {};
const mutations = {};
const actions = {
    async createReply({ commit }, params) {
        return await reply.create(params);
    }
}
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}