import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: home }
  ]
})
