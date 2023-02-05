import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'article-list',
        component: () => import('@/views/Index.vue'),
        children: [
            {
                path: 'home',
                component: () => import('@/views/articles/list.vue')
            },
            {
                path: '/article/detail',
                name: 'article-detail',
                // meta: {
                //     requireAuth: true
                // },
                component: () => import('../views/articles/detail.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/About.vue')
            },
            {
                path: '/myPage',
                name: 'myPage',
                component: () => import('../views/user/myPage.vue')
            },
            {
                path: '/writeArticle',
                name: 'writeArticle',
                component: () => import('../views/articles/writeAriticle.vue')
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('../views/user/setting.vue')
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/index')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/views/register/index')
            }
        ]
    },

]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'nav-active',//准确切换路由类名
    routes
})

export default router