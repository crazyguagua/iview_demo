// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'

// import iView from 'iview';
// import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/main.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.$http = axios;

Vue.use(VueRouter);
// Vue.use(iView);
const router = new VueRouter({
    mode: 'history',
    routes //等于 routes:routes
})

const app = new Vue({
    router: router
}).$mount('#app')