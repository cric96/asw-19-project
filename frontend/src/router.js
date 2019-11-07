import Vue from 'vue'
import store from './store/store'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from '@/views/user/Login.vue'
import Building from '@/views/building/Building.vue'
import SignUp from '@/views/user/SignUp.vue'
import HomeReport from '@/views/HomeReport.vue'
import Rewards from '@/views/Rewards.vue'
import Leaderboard from '@/views/Leaderboard.vue'
import Intro from '@/views/Intro.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import ChangePassword from '@/views/user/ChangePassword.vue'

Vue.use(Router)
/**
 * in this files are defined all paths to each view's vue.
 */
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/intro',
      name: 'Intro',
      component: Intro,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: SignUp
        }
      ]
    },
    {
      path: '*',
      redirect: '/intro'
    },
    {
      path: '/',
      redirect: '/intro',  
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: "Dashboard",
      meta: {
        requiresAuth: true,
        title: 'Dashboard'
      },
      children: [
        {
          path: '', // TODO: replace it with a main home page.
          name: 'Home',
          component: HomeReport
        },
        {
          path: '/buildings',
          name: 'Buildings',
          component: Building
        },
        {
          path: '/userProfile',
          name: 'UserInfo',
          component: UserInfo,
        },
        {
          path: '/rewards',
          name: 'Rewards',
          component: Rewards
        },
        {
          path: '/leaderboard',
          name: 'Leaderboard',
          component: Leaderboard
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(store.getters['user/isUserLoading']) {
    const unwatch = store.watch((state, getters) => getters['user/userProfile'], function() {
      routeGuard(to, from, next)
      unwatch()
    })
  } else {
    routeGuard(to, from, next)
  }
})

function routeGuard(to, from, next) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let isAuth = store.getters['user/isAuthenticated']
  if (requiresAuth && !isAuth) next('intro')
  else if (!requiresAuth && isAuth) { next('dashboard') }
  else next()
}

export default router
