import Vue from 'vue'
import VueRouter from 'vue-router'
//loading-bar
import loading from './components/ui/loading'
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
    },
    {
        path: '/audit',
        name: 'audit',
        component: resolve => require(['./views/reg/audit'], resolve)
            // component: require('./views/login') //component 不能拼写错误，否则路由加载不进来
    },
    {
        path: '/reg',
        name: 'reg',
        component: resolve => require(['./views/reg/reg'], resolve),
        children: [
            {
                
                path:'select/:type', //这里不能有斜杠   '/select'
                component: resolve => require(['./views/reg/regCompany'], resolve)
            },
            {
                path:'select', //这里不能有斜杠   '/select'
                component: resolve => require(['./views/reg/select'], resolve)
            },
            {
                path:'success/:message',
                 component: resolve => require(['./views/reg/success'], resolve)
            }
            ]
    },
     {
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
loading.globalConfig({
    height:3
})
router.beforeEach((to, from, next) => {
    // ...
    loading.start();
    next();
})
router.afterEach(route => {
  // ...
  loading.finish();
})
export default router