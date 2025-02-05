<script setup lang="ts">
  import { ref } from 'vue';
  import type { TodoTask } from '@/types/task-type';

  interface Props {
    task: TodoTask;
    onClose: () => void;
    onDelete: () => void;
    onEdit: (updatedTask: string) => void;
  }

  const props = defineProps<Props>();
  const editedTask = ref(props.task.task);

  function handleEdit() {
    props.onEdit(editedTask.value);
    props.onClose();
  }

  function handleDelete() {
    props.onDelete();
    props.onClose();
  }
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div>
        <label for="task">Enter Task Name</label>
        <input v-model="editedTask" id="task" type="text" />
      </div>

      <div class="modal-actions">
        <button @click="handleEdit" class="edit-btn">Edit</button>
        <button @click="handleDelete" class="delete-btn">Delete</button>

        <button @click="onClose" class="close-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Example modal styling */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
    color: black;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .edit-btn {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-btn {
    background-color: #ff4d4d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-btn {
    background-color: #ccc;
    color: black;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
