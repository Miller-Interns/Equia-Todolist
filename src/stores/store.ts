import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { TodoList } from '../types/list-type';

export const useTodoStore = defineStore('todo', () => {
  // State
  const stored = localStorage.getItem('todoLists');
  const todoLists = ref<TodoList[]>(stored ? JSON.parse(stored) : []);

  // Actions
  const editTask = (
    categoryId: number,
    taskId: number,
    updatedTask: string
  ) => {
    const category = todoLists.value.find((cat) => cat.idList === categoryId);
    if (!category) return;

    const task = category.TodoTask?.find((t) => t.idTask === taskId);
    if (!task) return;

    task.task = updatedTask;
  };

  const deleteTask = (categoryId: number, taskId: number) => {
    const category = todoLists.value.find((cat) => cat.idList === categoryId);
    if (!category) return;

    category.TodoTask = category.TodoTask?.filter((t) => t.idTask !== taskId);
  };

  const toggleTaskDone = (
    categoryId: number,
    taskId: number,
    isDone: boolean
  ) => {
    const category = todoLists.value.find((cat) => cat.idList === categoryId);
    if (!category) return;

    const task = category.TodoTask?.find((t) => t.idTask === taskId);
    if (!task) return;

    task.isDone = isDone;
  };

  watch(
    todoLists,
    (newValue) => {
      localStorage.setItem('todoLists', JSON.stringify(newValue));
    },
    { deep: true }
  );

  return {
    todoLists,
    editTask,
    deleteTask,
    toggleTaskDone,
  };
});
