var routes = [{
    path: '/',
    name: 'login',
    component: require('./views/login') //component 不能拼写错误，否则路由加载不进来

}, {
    path: '/home',
    name: 'home',
    component: require('./views/home'),
    children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        {
            path: '/home/dashboard',
            name: 'dashboard',
            component: require('./views/dashboard/dashboard')
        },
        {
            path: '/home/userManage',
            name: 'userManage',
            component: require('./views/userManage/userManage')
        }

        // ...其他子路由
    ]

}]



export default routes;