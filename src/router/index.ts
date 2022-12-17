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
      component: () => import('../views/dragable/index.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/practice/index.vue')
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
