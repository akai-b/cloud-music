import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/DiscoveryView.vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dragable',
      name: 'dragable',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dragable/index.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  NProgress.start()
  
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
