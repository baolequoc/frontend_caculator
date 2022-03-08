import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Caculator/caculator.vue'
import Register from '../views/Register/register.vue'
const routes = [
  {
     path: '/', redirect: '/home' 
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/login.vue')
  },
  {
    path: '/register',
    name: 'signup',
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
