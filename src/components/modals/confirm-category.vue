<script setup lang="ts">
  defineProps({
    message: {
      type: String,
      required: true,
    },
  });

  defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="$emit('confirm')" class="confirm-btn">
          Yes, Delete
        </button>
        <button @click="$emit('cancel')" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
    z-index: 1000;
  }

  .modal-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .confirm-btn {
    background-color: #d9534f;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-btn {
    background-color: #6c757d;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
