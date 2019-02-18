import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import home from '@/components/home'
import welcome from '@/components/welcome'
import users from '@/components/users'

Vue.use(Router)

const router =new  Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: home ,redirect:'/welcome',children:[
      {path: '/welcome', component: welcome},
      {path: '/users', component: users}
    ]}
  ]
})
// 设置全局守卫
router.beforeEach((to, from, next) => {
  if(to.path === "/login") {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if(!token) {
    return next('/login')
  }
    next()
})

export default router