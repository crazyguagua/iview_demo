
var routes = [{
    path: '/',
    name: 'login',
    component:require('./views/login')//component 不能拼写错误，否则路由加载不进来

}, {
    path: '/home',
    name: 'home',
    component:require('./views/home')

}]



export default routes;