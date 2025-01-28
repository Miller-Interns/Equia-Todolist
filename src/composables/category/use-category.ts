import { ref } from 'vue';
import { useTodoStore } from '../../stores/store';
import { useToast } from '../use-toast';

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
      showToast('Category added successfully!', 'success');
    } else {
      showToast('Please enter a category name.', 'error');
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

    const catObj = todoStore.todoLists.find(
      (c) => c.idList === selectedCategory.value!.idList
    );

    if (catObj) {
      catObj.category = newCategoryName;
      showToast('Category edited successfully!', 'success');
    }
  }

  function confirmDeleteCategory() {
    showDeleteConfirmation.value = true;
  }

  function handleDeleteCanceled() {
    showDeleteConfirmation.value = false;
    showToast('Deletion canceled.', 'info');
  }

  function handleDeleteConfirmed() {
    if (!selectedCategory.value) return;

    const index = todoStore.todoLists.findIndex(
      (c) => c.idList === selectedCategory.value!.idList
    );

    if (index !== -1) {
      todoStore.todoLists.splice(index, 1);
      showToast('Category deleted successfully!', 'success');
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
