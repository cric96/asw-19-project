import Vue from 'vue'
import fb from './firebaseConfig'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import HomeReport from './views/HomeReport.vue'
import Intro from './views/Intro.vue'
import ManualInsertion from './views/scan/ManualInsertion.vue'
import AiInsertion from './views/scan/AiInsertion.vue'
import BarcodeInsertion from './views/scan/BarcodeInsertion.vue'

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
          path: '/ai',
          name: 'AiInsertion',
          component: AiInsertion,
          props: true
        },
        {
          path: '/barcode',
          name: 'BarcodeInsertion',
          component: BarcodeInsertion
        },
        {
          path: '/manual',
          name: 'Manual',
          component: ManualInsertion
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const unsub = fb.auth.onAuthStateChanged(currentUser => {
    if(requiresAuth && !currentUser) {
      // goto main page login
      next('intro');
    } else if(requiresAuth && currentUser) {
      // next to complete registration
      next();
    }
    unsub();
  });

});

export default router;
