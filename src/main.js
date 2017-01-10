// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'

//import iview from 'iview'
//import 'iview/dist/styles/iview.css'; // 使用 CSS
/* eslint-disable no-new */
Vue.use(VueRouter);
//Vue.use(iview);

const router = new VueRouter({
    routes,
    mode: 'history'
})

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')