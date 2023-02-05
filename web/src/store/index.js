import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import category from './modules/category'
import comment from './modules/comment'
import reply from './modules/reply'
import advertise from './modules/advertise'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    article,
    category,
    comment,
    reply,
    advertise,
    user
  }
})
