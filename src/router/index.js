import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Login',
    // component: DefaultLayout,
    //redirect: { name: 'Login' },
    component: () => import('@/views/modules/login/Login.vue')
    // children: [
    //   {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import('@/views/modules/login/Login.vue'),

    //   },
    //   {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //       import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    //   },
    //   {
    //     path: '/profile',
    //     name: 'Profile',
    //     component: () => import('@/views/modules/profile/Profile.vue'),
    //     //redirect: '/theme/typography',
    //   },
    //   {
    //     path: '/theme/colors',
    //     name: 'Colors',
    //     component: () => import('@/views/theme/Colors.vue'),
    //   },
    //   {
    //     path: '/theme/typography',
    //     name: 'Typography',
    //     component: () => import('@/views/theme/Typography.vue'),
    //   },
    // ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: DefaultLayout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        //add simple middleware
        beforeEnter:  (to, from, next) => {
          if(!localStorage.getItem('token')){
            Swal.fire({
              title: 'Alert',
              text: 'Login Terlebih Dahulu',
              icon: 'warning',
              confirmButtonText: 'Ok'
          })
            return next({
              name: 'Login'
            })
          }

          return next()
        }
      },
      {
        path: '/data',
        name: 'Data',
        component: () => import('@/views/modules/profile/Profile.vue')
      }
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      // {
      //   path: 'login',
      //   name: 'Login',
      //   component: () => import('@/views/pages/Login'),
      // },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

//config nprogress
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
