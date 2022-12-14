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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: DefaultLayout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },

      //start route data
      {
        path: '/data',
        name: 'Data',
        component: () => import('@/views/modules/profile/Profile.vue')
      },
      {
        path: '/data/create',
        name: 'create.data',
        component: () => import('@/views/modules/profile/Create.vue')
      },
      {
        path: '/data/edit/:id',
        name: 'edit.data',
        beforeEnter: (to, from, next) => {
          if(to.name == 'edit.data' && sessionStorage.getItem('role') == 0){
            Swal.fire({
              title: 'Error',
              text: 'Gagal',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            return next({ name: 'Data' })
          }
        },
        component: () => import('@/views/modules/profile/Edit.vue')
      },
      //finish route data

      //start route akun
      {
        path: '/akun',
        name: 'Akun',
        component: () => import('@/views/modules/akun/Index.vue')
      },
      {
        path: '/akun/create',
        name: 'create.akun',
        component: () => import('@/views/modules/akun/Create.vue')
      },
      {
        path: '/akun/edit/:id',
        name: 'edit.akun',
        component: () => import('@/views/modules/akun/Edit.vue')
      },
      //finish route akun
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !sessionStorage.getItem('token')){
    Swal.fire({
      title: 'Error',
      text: 'login terlebih dahulu',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return next({ name: 'Login' })
  }

  // if(to.name !== 'edit.data' && sessionStorage.getItem('role') !== 1){
  //   Swal.fire({
  //     title: 'Error',
  //     text: 'Gagal',
  //     icon: 'error',
  //     confirmButtonText: 'Ok'
  //   })
  //   return next({ name: 'Data' })
  // }

  else{
    return next()
  }
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
