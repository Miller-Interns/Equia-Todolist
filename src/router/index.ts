import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '../enums/route-names';
import traineeInfo from '../views/trainee-details.vue';
import listInfo from '../views/todo-list.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.HOME,
      component: traineeInfo,
    },

    {
      path: '/todo-list',
      name: RouteName.TODOLIST,
      component: listInfo,
    },
  ],
});

export default router;
