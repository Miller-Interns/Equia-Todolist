import { ref } from 'vue';
import { useTodoStore } from '@/stores/store';
import type { TodoTask } from '@/interface/task-type';

export function useTaskActions(categoryId: number) {
  const todoStore = useTodoStore();

  const taskName = ref('');
  const showModal = ref(false);
  const selectedTask = ref<TodoTask | null>(null);

  function addNewTask() {
    if (taskName.value.trim()) {
      todoStore.todoLists.forEach((cat) => {
        if (cat.idList === categoryId) {
          if (!cat.TodoTask) {
            cat.TodoTask = [];
          }
          cat.TodoTask.push({
            idTask: Date.now(),
            task: taskName.value.trim(),
            isDone: false,
            isDeleted: false,
          });
        }
      });

      taskName.value = '';
    } else {
      alert('ERROR: Enter Task.');
    }
  }

  function openModal(task: TodoTask) {
    selectedTask.value = task;
    showModal.value = true;
  }

  function closeModal() {
    selectedTask.value = null;
    showModal.value = false;
  }

  function toggleComplete(taskId: number, isDone: boolean | undefined) {
    todoStore.toggleTaskDone(categoryId, taskId, isDone ?? false);
  }

  function handleEditTask(updatedTask: string) {
    if (!selectedTask.value) return;

    todoStore.editTask(categoryId, selectedTask.value.idTask, updatedTask);
    alert(`Task updated: ${updatedTask}`);
    closeModal();
  }

  function handleDeleteTask() {
    if (!selectedTask.value) return;

    todoStore.deleteTask(categoryId, selectedTask.value.idTask);
    alert('Task deleted!');
    closeModal();
  }

  return {
    taskName,
    showModal,
    selectedTask,
    addNewTask,
    openModal,
    closeModal,
    toggleComplete,
    handleEditTask,
    handleDeleteTask,
  };
}
