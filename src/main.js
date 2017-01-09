// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import Login from './views/login'
/* eslint-disable no-new */


const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el:'#app',
    ...Login,
    router})