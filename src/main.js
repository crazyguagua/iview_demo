// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'

import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用 CSS

Vue.use(VueRouter);
Vue.use(iView);
const router = new VueRouter({
    mode: 'history',
    routes //等于 routes:routes
})

const app = new Vue({
    router: router
}).$mount('#app')