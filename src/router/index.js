import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/users',
    name: 'ListUsers',
    component: () => import('../views/ListUsers.vue'),
  },
  {
    path: '/users/:id',
    name: 'DetailUser',
    component: () => import('../views/DetailUser.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Home') next({ name: 'ListUsers' })
  else next()
})

export default router
