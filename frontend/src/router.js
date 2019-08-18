import Vue from 'vue'
import firebase from 'firebase'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import HomeReport from './views/HomeReport.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/',
      redirect: '/dashboard'
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
          path: 'other', // TODO: replace it with a main home page.
          name: 'Other',
          component: Login,
          meta: {
            title: 'Other'
          },
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});

export default router;
