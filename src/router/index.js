import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: Login,
      path: '/login',
      component: Login
    },
    {
      name:Home,
      path:'/home',
      component:Home
    }
  ]
})
