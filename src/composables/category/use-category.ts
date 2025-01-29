import { ref } from 'vue';
import { useTodoStore } from '../../stores/store';
import { useToast } from '../use-toast';
import { ToastType } from '@/enums/toast-enum';

export function UseCategory() {
  const todoStore = useTodoStore();
  const { showToast } = useToast();

  const categoryName = ref('');
  const showCategoryModal = ref(false);
  const showDeleteConfirmation = ref(false);
  const selectedCategory = ref<{ idList: number; category: string } | null>(
    null
  );

  function addCategory() {
    if (categoryName.value.trim()) {
      todoStore.todoLists.push({
        idList: Date.now(),
        category: categoryName.value.trim(),
        isEdited: false,
        isDone: false,
        isDeleted: false,
        TodoTask: [],
      });
      categoryName.value = '';
      showToast('Category added successfully!', ToastType.SUCCESS);
    } else {
      showToast('Please enter a category name.', ToastType.ERROR);
    }
  }

  function openCategoryModal(cat: { idList: number; category: string }) {
    selectedCategory.value = cat;
    showCategoryModal.value = true;
  }

  function closeCategoryModal() {
    showCategoryModal.value = false;
    selectedCategory.value = null;
  }

  function handleEditCategory(newCategoryName: string) {
    if (!selectedCategory.value) return;

    const itemCategory = todoStore.todoLists.find(
      (c) => c.idList === selectedCategory.value!.idList
    );

    if (itemCategory) {
      itemCategory.category = newCategoryName;
      showToast('Category edited successfully!', ToastType.SUCCESS);
    }
  }

  function confirmDeleteCategory() {
    showDeleteConfirmation.value = true;
  }

  function handleDeleteCanceled() {
    showDeleteConfirmation.value = false;
    showToast('Deletion canceled.', ToastType.INFO);
  }

  function handleDeleteConfirmed() {
    if (!selectedCategory.value) return;

    const index = todoStore.todoLists.findIndex(
      (c) => c.idList === selectedCategory.value!.idList
    );

    if (index !== -1) {
      todoStore.todoLists.splice(index, 1);
      showToast('Category deleted successfully!', ToastType.SUCCESS);
    }

    showDeleteConfirmation.value = false;
    selectedCategory.value = null;
  }

  return {
    todoLists: todoStore.todoLists,
    categoryName,
    showCategoryModal,
    selectedCategory,
    addCategory,
    openCategoryModal,
    closeCategoryModal,
    handleEditCategory,
    showDeleteConfirmation,
    confirmDeleteCategory,
    handleDeleteConfirmed,
    handleDeleteCanceled,
  };
}
