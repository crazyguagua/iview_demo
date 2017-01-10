var routes = [{
    path: '/',
    name: 'login',
    compnent: resolve => require(['./views/login'], resolve)

}, {
    path: '/home',
    name: 'home',
    compnent: resolve => require(['./views/home'], resolve)

}]



export default routes;