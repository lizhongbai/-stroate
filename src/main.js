import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import MyAxios from './plugins/myasiox'
import moment from 'moment'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyAxios)
//定义格式时间的插件 ,定义全局过滤器定义时间
Vue.filter('dataForm',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
