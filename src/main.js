// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/globle.css'
import ElementUI from 'element-ui';   //引入element-ui
import './assets/fonts/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'

// 配置axios请求拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  var token =window.sessionStorage.getItem('token')
  config.headers.Authorization=token    // 配置一个请求头是否携带token
  return config ;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
