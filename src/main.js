import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'
import axios from 'axios'
/* deploy the root path of request */
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// ios.defaults.baseURL = 'https://ecommerce00.netlify.app/api/private/v1/login'
/* get data from server */
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
