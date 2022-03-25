import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import TimeLine from '../views/TimeLine/TimeLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      redirect: '/home/timeline'
    },

    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'timeline',
          component: TimeLine
        }
      ]
    }
  ]
})
