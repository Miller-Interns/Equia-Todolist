<script lang="ts">
  import { defineComponent } from 'vue';
  import { useToast } from '@/composables/use-toast';

  export default defineComponent({
    name: 'ToastMessage',
    setup() {
      const { toasts } = useToast();

      return {
        toasts,
      };
    },
  });
</script>

<template>
  <div
    v-for="toast in toasts"
    :key="toast.id"
    class="toast"
    :class="toast.type"
  >
    {{ toast.message }}
  </div>
</template>

<style scoped>
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    z-index: 1000;
    animation: fade-in-out 0.5s ease-in-out;
    margin-bottom: 10px;
  }

  .toast.success {
    background-color: #28a745;
  }

  .toast.error {
    background-color: #dc3545;
  }

  .toast.info {
    background-color: #17a2b8;
  }

  @keyframes fade-in-out {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
