// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

// import iView from 'iview';
// import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/main.css'

import axios from 'axios'
import store from './store'

axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.$http = axios;

Vue.filter('dateformat', function (value,format) {
  // 返回处理后的值
   let newValue = value.replace(/(\d{4})-(\d{1,2})-(\d{1,2}).+(\d{2}):(\d{2}):(\d{2}).+/mg, '$1-$2-$3 $4:$5:$6'); 
   return newValue;
})



const app = new Vue({
    router: router,
    store
}).$mount('#app')
// loading.globalConfig({
//     color:'yellow',
//     height:5
// });
// loading.start();

// setTimeout(function(){
//     loading.finish();
// },3000)