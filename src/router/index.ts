import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list/index.vue'),
    },
    {
      path: '/apiConfig',
      name: 'apiConfig',
      component: () => import('../views/apiConfig/index.vue'),
    },
  ],
})

export default router
