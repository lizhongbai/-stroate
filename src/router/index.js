import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
//y引入home的孩子们
import User from '../views/user/user.vue'
import rose from '../views/roseList/roseList.vue'
import permission from '../views/permissionList/permissionList.vue'
import category from '../views/goods/category/categories.vue'
import goods from '../views/goods/goodsList/goods.vue'
import params from '../views/goods/params/params.vue'

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
          path: '/users',
          component: User
        },
        {
          path: '/roles',
          component: rose
        },
        {
          path: '/rights',
          component: permission
        },
        {
          path: '/categories',
          component: category
        },
        {
          path: '/goods',
          component: goods
        },
        {
          path: '/params',
          component: params
        }
      ]
    }
  ]
})
