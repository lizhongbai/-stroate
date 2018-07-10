import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
//y引入home的孩子们
import User from '../views/user/user.vue'
import rose from '../views/roseList/roseList.vue'
import permission from '../views/permissionList/permissionList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: Login,
      path: '/login',
      component: Login
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path: '/user',
          component: User
        },
        {
          path: '/rose',
          component: rose
        },
        {
          path: '/permission',
          component: permission
        }
      ]
    }
  ]
})
