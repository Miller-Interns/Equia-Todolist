<script setup lang="ts">
  import { UseCategory } from '@/composables/category/use-category';
  import { useToast } from '@/composables/use-toast';
  import TodoTask from '../components/todo-task.vue';
  import CategoryModal from '../components/modals/category-modal.vue';
  import Toast from '../components/message/toast-message.vue';
  import ConfirmationModal from '../components/modals/confirm-category.vue';
  import EditIcon from '../components/icons/IconCategoryEdit.vue';
  const { toasts } = useToast();
  const {
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
    todoLists,
  } = UseCategory();
</script>

<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h3>Categories and Tasks</h3>
      <div v-if="todoLists.length">
        <div
          v-for="category in todoLists"
          :key="category.idList"
          class="category"
        >
          <h3>{{ category.category }}</h3>
          <ul class="task-list">
            <li v-for="task in category.TodoTask || []" :key="task.idTask">
              {{ task.task }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>No categories or tasks available.</p>
      </div>
    </aside>

    <!-- Main Content -->
    <section class="main-content">
      <h1>Todo List</h1>
      <div>
        <input
          v-model="categoryName"
          type="text"
          placeholder="Enter Category Name"
        />
        <button @click="addCategory" class="add-category-btn">
          Add Category
        </button>
      </div>

      <h1>Existing Categories</h1>
      <div class="categories">
        <div
          v-for="list in todoLists"
          :key="list.idList"
          class="card hover-category"
        >
          <h2
            @click="
              openCategoryModal({
                idList: list.idList,
                category: list.category,
              })
            "
          >
            {{ list.category }} <EditIcon />
          </h2>
          <TodoTask :categoryId="list.idList" :tasks="list.TodoTask || []" />
        </div>
      </div>

      <!-- Category Modal -->
      <CategoryModal
        v-if="showCategoryModal && selectedCategory"
        :categoryName="selectedCategory.category"
        :onClose="closeCategoryModal"
        :onEdit="handleEditCategory"
        :onDelete="confirmDeleteCategory"
      />

      <!-- Delete Confirmation Modal -->
      <ConfirmationModal
        v-if="showDeleteConfirmation"
        :message="'Are you sure you want to delete this category? It contains more than one task.'"
        @confirm="handleDeleteConfirmed"
        @cancel="handleDeleteCanceled"
      />
    </section>

    <!-- Toast Notifications -->
    <div class="toast-container">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
      />
    </div>
  </div>
</template>
<style scoped>
  /* Keep your original styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #1c1c1c;
    color: #fff;
  }

  h1,
  h2,
  h3 {
    margin: 0 0 10px 0;
  }

  input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .card {
    background-color: #2e2e2e;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .add-category-btn {
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bffb9;
    color: #fff;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .sidebar {
    width: 250px;
    padding: 20px;
    background-color: #181818;
    height: 100vh;
    position: fixed;
    overflow-y: auto;
  }

  .main-content {
    flex: 1;
    margin-left: 270px;
    padding: 20px;
    border-radius: 8px;
    background-color: #181818;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  .main-content h1 {
    margin-bottom: 15px;
    font-size: 24px;
    color: rgba(235, 235, 235, 0.712);
  }

  .hover-category {
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
  }

  .todo-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .todo-card {
    background-color: #2e2e2e;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .todo-add {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  .editable-category {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .editable-category:hover {
    color: #007bff;
  }

  .icon-pencil {
    height: 18px;
    width: 18px;
    color: #6c757d;
    transition: color 0.3s ease;
  }

  .editable-category:hover .icon-pencil {
    color: #007bff;
  }

  /* Sidebar container styling */
  .sidebar {
    background-color: #181818;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    scrollbar-width: none;
  }

  .sidebar::-webkit-scrollbar {
    display: none;
  }

  .sidebar h3 {
    text-align: left;
    margin-bottom: 20px;
    margin-top: 10px;
    font-size: 20px;
    color: #f0f0f0;
    border-bottom: 2px solid #444;
    padding-bottom: 5px;
  }

  .task-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .task-list li {
    padding: 10px;
    margin-bottom: 5px;
    text-align: left;
    color: #f0f0f0;
    background-color: #262626;
    border-radius: 4px;
  }

  .task-list li:hover {
    background-color: #3a3a3a;
    cursor: pointer;
  }

  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
</style>
