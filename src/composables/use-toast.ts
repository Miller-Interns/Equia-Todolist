import { ref } from 'vue';
import { ToastType } from '../enums/toast-enum';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  const showToast = (message: string, type: ToastType = ToastType.SUCCESS) => {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
    }, 3000);
  };

  return {
    toasts,
    showToast,
  };
}
