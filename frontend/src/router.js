import Vue from 'vue'
import fb from './firebaseConfig'
import store from './store/store'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Building from './views/building/Building.vue'
import SignUp from './views/SignUp.vue'
import HomeReport from './views/HomeReport.vue'
import Intro from './views/Intro.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    },
    {
      path: '*',
      redirect: '/intro'
    },
    {
      path: '/',
      redirect: '/intro'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
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
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
 /* if(store.getters.isUserLoading) {
    const unwatch = store.watch((state, getters) => getters.userProfile, function() {
      routeGuard(to, from, next)
      unwatch()
    })
  } else {
    routeGuard(to, from, next)
  }*/
  next()
})

function routeGuard(to, from, next) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let isAuth = store.getters.isAuthenticated

  if (requiresAuth && !isAuth) next('intro')
  else if (!requiresAuth && isAuth) { next('dashboard') }
  else next()
}

export default router
