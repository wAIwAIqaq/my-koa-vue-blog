import user from '@/api/user';
const state = {
    userInfo: null
};
const mutations = {
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
        console.log(state.userInfo);
    }
};
const actions = {
    async userLogin({ commit, state }, params) {
        const { nickname, password } = params
        let res = await user.login({ nickname, password });
        return res
    },
    async userAuth({ commit }, params) {
        let res = await user.auth(params)
        commit('SET_USER_INFO', res.data.data)
        return res
    },
    async userRegister({ commit, state }, params) {
        let res = await user.register(params)
    }
}
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}