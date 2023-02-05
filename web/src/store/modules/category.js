import category from "../../api/category";
const state = {
  categoryList: [],
  categoryIndex: 0,
};
const mutations = {
  SET_CATEGORY_LIST(state, list) {
    state.categoryList = list;
  },
  SET_CATEGORY_INDEX(state, index) {
    state.categoryIndex = index;
  },
};
const actions = {
  async list({ commit, state }, params) {
    if (state.categoryList && state.categoryList.length > 0) {
      return state.categoryList;
    }
    let res = await category.list(params);
    let categoryList = res.data.data;
    categoryList.unshift({ name: "全部" });
    commit("SET_CATEGORY_LIST", categoryList);
  },
  async createCategory({ commit, state }, params) {
    return await category.create(params);;
  },
  async articleList({ commit, state }, params) {
    if (state.categoryList && state.categoryList.length > 0) {
      return state.categoryList;
    }
    let res = await category.list(params);
    let categoryList = res.data.data;
    commit("SET_CATEGORY_LIST", categoryList);
  },
};
export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  actions,
};
