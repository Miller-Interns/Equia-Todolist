<script setup lang="ts">
  import { defineProps } from 'vue';
  import TaskModal from './modals/task-modal.vue';
  import AddIcon from '../components/icons/IconCategoryAdd.vue';
  import type { TodoTask } from '@/types/task-type';
  import { UseTask } from '@/composables/task/use-task';
  import ViewIcon from '../components/icons/IconView.vue';

  interface Props {
    categoryId: number;
    tasks: TodoTask[];
  }

  const props = defineProps<Props>();

  const {
    taskName,
    showModal,
    selectedTask,
    addNewTask,
    openModal,
    closeModal,
    toggleComplete,
    handleEditTask,
    handleDeleteTask,
  } = UseTask(props.categoryId);
</script>

<template>
  <div class="task-manager">
    <!-- Input for adding a new task -->
    <div>
      <input
        v-model="taskName"
        type="text"
        placeholder="Enter Task Name"
        class="task-input-field"
      />
      <button @click="addNewTask" class="task-add-btn">
        Add Task
        <AddIcon />
      </button>
    </div>

    <!-- Display list of tasks -->
    <ul class="task-list">
      <li v-for="task in props.tasks" :key="task.idTask" class="task-item">
        <div class="task-details">
          <!-- Checkbox to toggle "isDone" -->
          <input
            type="checkbox"
            v-model="task.isDone"
            @change="toggleComplete(task.idTask, task.isDone)"
            class="task-checkbox"
          />

          <!-- Task name with strikethrough if completed -->
          <span :class="{ strikethrough: task.isDone }" class="task-text">
            {{ task.task }}
          </span>
        </div>

        <!-- View Button -->
        <button @click="openModal(task)" class="white-view">
          <ViewIcon />
        </button>
      </li>
    </ul>

    <!-- Modal for Tasks -->
    <TaskModal
      v-if="showModal && selectedTask"
      :task="selectedTask"
      :onClose="closeModal"
      :onDelete="handleDeleteTask"
      :onEdit="handleEditTask"
    />
  </div>
</template>

<style scoped>
  .task-manager {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .white-view {
    color: white;
  }

  .task-input {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .task-input-field {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .task-add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #4e95e1;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }

  .task-add-btn:hover {
    background-color: #0056b3;
  }

  .icon {
    height: 20px;
    width: 20px;
  }

  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  .task-details {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .task-checkbox {
    width: 18px;
    height: 18px;
  }

  .task-text {
    font-size: 16px;
    color: #333;
  }

  .strikethrough {
    text-decoration: line-through;
    color: #999;
  }

  .task-view-btn {
    padding: 5px 10px;
    background-color: #49c265;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .task-view-btn:hover {
    background-color: #218838;
  }

  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #3f9152;
  }

  h1,
  h2,
  h3 {
    margin: 0 0 10px 0;
    color: white;
  }
</style>
