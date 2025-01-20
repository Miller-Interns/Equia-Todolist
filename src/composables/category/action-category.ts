import { ref } from 'vue';
import { useTodoStore } from '../../stores/store';

export function useCategoryActions() {
  const todoStore = useTodoStore();

  const categoryName = ref('');
  const showCategoryModal = ref(false);
  const selectedCategory = ref<{ idList: number; category: string } | null>(null);

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
    } else {
      alert('ERROR: Enter a category.');
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
    }
  }

  function handleDeleteCategory() {
    if (!selectedCategory.value) return;

    todoStore.todoLists = todoStore.todoLists.filter(
      (c) => c.idList !== selectedCategory.value!.idList
    );

    closeCategoryModal();
    alert('Category Deleted!');
  }

  return {
    categoryName,
    showCategoryModal,
    selectedCategory,
    addCategory,
    openCategoryModal,
    closeCategoryModal,
    handleEditCategory,
    handleDeleteCategory
  };
}
