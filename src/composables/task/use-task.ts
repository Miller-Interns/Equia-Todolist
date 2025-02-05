import { ref } from 'vue';
import { useTodoStore } from '@/stores/store';
import type { TodoTask } from '@/types/task-type';
import { useToast } from '../use-toast';

export function UseTask(categoryId: number) {
  const todoStore = useTodoStore();
  const { showToast } = useToast();

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
          taskName.value = '';
          showToast('Task added successfully!', 'success');
        }
      });

      taskName.value = '';
    } else {
      showToast('Please enter task name.', 'error');
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
    showToast(
      isDone ? 'Task marked as complete!' : 'Task marked as incomplete.',
      'info'
    );
  }

  function handleEditTask(updatedTask: string) {
    if (!selectedTask.value) return;

    todoStore.editTask(categoryId, selectedTask.value.idTask, updatedTask);
    showToast('Task updated successfully!', 'success');
    closeModal();
  }

  function handleDeleteTask() {
    if (!selectedTask.value) return;

    todoStore.deleteTask(categoryId, selectedTask.value.idTask);
    showToast('Task deleted successfully!', 'success');
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
