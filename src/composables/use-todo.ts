import { useTodoStore } from '@/stores/store';
import { computed } from 'vue';

export function useTodo() {
  const todoStore = useTodoStore();

  return {
    todoLists: computed(() => todoStore.todoLists),
    editTask: todoStore.editTask,
    deleteTask: todoStore.deleteTask,
    toggleTaskDone: todoStore.toggleTaskDone,
  };
}
