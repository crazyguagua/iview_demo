import Vue from 'vue'
import VueRouter from 'vue-router'
var routes = [

    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['./views/login'], resolve)
            // component: require('./views/login') //component 不能拼写错误，否则路由加载不进来
    }, {
        path: '/home',
        name: 'home',
        // component: require('./views/home'),
        component: resolve => require(['./views/home'], resolve),
        children: [
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            {
                path: '/dashboard',
                name: 'dashboard',
                component: resolve => require(['./views/dashboard/dashboard'], resolve)
                    // component: require('./views/dashboard/dashboard')
            },
            {
                path: '/userManage',
                name: 'userManage',
                component: resolve => require(['./views/userManage/userManage'], resolve)
                    // component: require('./views/userManage/userManage')
            }

            // ...其他子路由
        ]

    }
]

Vue.use(VueRouter);
// Vue.use(iView);
var router = new VueRouter({
    // mode: 'history',
    routes //等于 routes:routes
})
router.beforeEach((to, from, next) => {
    // ...
    console.log(from);
    next();
})
export default router