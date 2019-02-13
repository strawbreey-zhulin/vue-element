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
