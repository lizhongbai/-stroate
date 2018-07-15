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
import orders from '@/views/orders/orders.vue'
import reports from '@/views/reports/reports.vue'
import addGoods from '@/views/goods/goodsList/addGoods.vue'
//导入提示
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name:'login',
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
        },
        {
          path: '/orders',
          component: orders
        },
        {
          path: '/reports',
          component: reports
        },
        {
          path: '/goods/addGoods',
          component: addGoods
        }
      ]
    }
  ]
})

//路由的前置对象
router.beforeEach((to, from, next) => {
    // to and from are both route objects
    // console.log(to,from)
  //判断当前访问的路由是否是login,如果是login直接next
  if( to.name === 'login') {

    next()
    
  } else {

    //判断有没有token
    const token = sessionStorage.getItem('token')
    
    if(!token) {

      router.push('/login')

	   Message.warning('请先登陆宝贝')

      return

    }

    next()
    
  }


})

export default router
