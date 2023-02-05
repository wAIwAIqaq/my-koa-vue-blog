import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 移动端自适应的配置
import 'lib-flexible/flexible.js'
// 使用elementUI的组件
import './plugins/element'
import VueLazyload from 'vue-lazyload';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'

// 使用富文本编辑器
Vue.use(mavonEditor);
Vue.use(VueLazyload);
Vue.config.productionTip = false;
// 设置路由守卫
router.beforeEach(async (to, from, next) => {
  const i = localStorage.getItem('categoryIndex')
  if (i) {
    store.commit('category/SET_CATEGORY_INDEX', i)
    next();
  } else {
    next();
  }
  const token = localStorage.getItem('token');
  if (token) {
    // 表示用户已登录，需要认证，获取用户信息
    // try {
    await store.dispatch('user/userAuth')
    next();
    // } catch (error) {
    //   setTimeout(() => {
    //     next('/login')
    //   }, 500);
    // }
  } else {
    if (to.meta.requireAuth) {
      // 需要登录
      next('/login');
    } else {
      next()
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
