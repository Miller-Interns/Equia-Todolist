import { createRouter, createWebHistory } from 'vue-router'
import traineeInfo from '../views/trainee-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: traineeInfo,
    },
    {
      path: '/todo-list',
      name: 'todo-list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/todo-list.vue'),
    },
  ],
})

export default router
