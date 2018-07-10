import axios from 'axios'

const MyAxios = {}

MyAxios.install = function (Vue) {
  // Vue.prototype.$http = axios
  // axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  //自定义axios
  const instance = axios.create ({

    baseURL: 'http://localhost:8888/api/private/v1/'

  })

  // Add a request interceptor
  //添加请求的拦截器
  instance.interceptors.request.use(function (config) {
    //请求发送之前要做的处理
    // Do something before request is sent
    // console.log(config)

    //判断当前请求的地址是否是login
    if ( config.url.toLocaleLowerCase() !== 'login') {

      const token = sessionStorage.getItem('token')
      //如果请求的地址不是login ，设置token

      config.headers.Authorization = token

    }

    return config;

  }, function (error) {

    // Do something with request error
    return Promise.reject(error)

  })

  // Add a response interceptor
  //添加响应的拦截器
  instance.interceptors.response.use(function (response) {

    // Do something with response data
    return response

  }, function (error) {

    // Do something with response error
    return Promise.reject(error)

  })

  Vue.prototype.$http = instance

}

export default MyAxios