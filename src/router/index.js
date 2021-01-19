import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import '../css/global.css'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import Users from '../user/Users.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* to means the path will visit */
  /* from means where the visit comes from */
  /* next is function , means allow and go next('/login') */
  /* if the user visit the login page , let it pass */
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
