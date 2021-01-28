import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        name: 'registration',
        path: '',
        component: () => import('../views/Register.vue'),
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('../views/Login.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
