import { defineStore } from 'pinia';
import { watch } from 'vue';
import type { TodoList } from '../interface/list-type';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    // Load from localStorage on initialization
    todoLists: JSON.parse(localStorage.getItem('todoLists') || '[]') as TodoList[],
  }),
  actions: {
    editTask(categoryId: number, taskId: number, updatedTask: string) {
      const category = this.todoLists.find(cat => cat.idList === categoryId);
      if (!category) return;

      const task = category.TodoTask?.find(t => t.idTask === taskId);
      if (!task) return;

      task.task = updatedTask;
      // No direct localStorage call here—watch handles it
    },

    deleteTask(categoryId: number, taskId: number) {
      const category = this.todoLists.find(cat => cat.idList === categoryId);
      if (!category) return;

      category.TodoTask = category.TodoTask?.filter(t => t.idTask !== taskId);
    },

    toggleTaskDone(categoryId: number, taskId: number, isDone: boolean) {
      const category = this.todoLists.find(cat => cat.idList === categoryId);
      if (!category) return;

      const task = category.TodoTask?.find(t => t.idTask === taskId);
      if (!task) return;

      task.isDone = isDone;
    },
  },
});

const todoStore = useTodoStore();

watch(
  () => todoStore.todoLists,
  (newValue) => {

    localStorage.setItem('todoLists', JSON.stringify(newValue));
  },
  { deep: true }
);
