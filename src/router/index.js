import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
//y引入home的孩子们
import User from '../views/user/user.vue' 

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
      component:Home,
      children:[
        { name:User,path:'/user',component:User},
      ]
    }
  ]
})
