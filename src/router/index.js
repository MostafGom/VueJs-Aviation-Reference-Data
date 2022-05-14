import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchAirline from '../components/SearchAirline.vue'
import FetchAvi from '../components/FetchAvi.vue'
import FetchByCoords from '../components/FetchByCoords.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/fetch-countries',
      name: 'fetch-countries',
      component: FetchAvi,
      props: true
    },
    {
      path: '/search-airlines',
      name: 'search-airlines',
      component: SearchAirline
    },
    {
      path: '/airport-by-coords',
      name: 'airports-coords',
      component: FetchByCoords
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
