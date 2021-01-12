import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import '../css/global.css'
import home from '../components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home', component: home }
  ]
})
