// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'

// import iView from 'iview';
// import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/main.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.$http = axios;



const app = new Vue({
    router: router
}).$mount('#app')