import { createRouter, createWebHistory } from 'vue-router';
import traineeInfo from '../views/trainee-details.vue';
import listInfo from '../views/todo-list.vue';

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
      name: 'todolist',
      component: listInfo,
    },
  ],
});

export default router;
