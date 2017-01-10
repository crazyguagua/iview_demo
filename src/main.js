// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'

//import iview from 'iview'
import 'iview/dist/styles/iview.css'// 使用 CSS
/* eslint-disable no-new */
Vue.use(VueRouter);
//Vue.use(iview);
console.log(routes);
const router = new VueRouter({
    mode:'history',
    routes  //等于 routes:routes
 })

const app = new Vue({
    router: router
}).$mount('#app')