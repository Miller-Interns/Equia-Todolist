<script setup lang="ts">
import { useTodoStore } from '@/stores/store';
import { useCategoryActions } from '@/composables/category/action-category';
import TodoTask from '../components/todo-task.vue'; 
import CategoryModal from '../components/category-modal.vue';
import EditIcon from '../components/icons/IconCategoryEdit.vue';

//styles
import styles from '../assets/styles/todo-list.module.css';

const todoStore = useTodoStore();

const {
  categoryName,
  showCategoryModal,
  selectedCategory,
  addCategory,
  openCategoryModal,
  closeCategoryModal,
  handleEditCategory,
  handleDeleteCategory
} = useCategoryActions();
</script>

<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h3>Categories and Tasks</h3>
      <div v-if="todoStore.todoLists.length">
        <!-- List categories -->
        <div
          v-for="category in todoStore.todoLists"
          :key="category.idList"
          class="category"
        >
          <h3>{{ category.category }}</h3>
          <ul>
            <!-- List tasks in this category -->
            <li 
              v-for="task in category.TodoTask || []" 
              :key="task.idTask"
            >
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
      <div>
        <h1>Todo List</h1>
        <div>
          <input
            v-model="categoryName"
            type="text"
            placeholder="Enter Category Name"
          />
          <button
            @click="addCategory"
            style="
            
              padding: 10px;
              background-color: #0163CD;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 14px;
              cursor: pointer;
              transition: background-color 0.3s ease;
              margin-bottom: 10px;
            "
          >
            Add Category
          </button>
        </div>

        <h1>Existing Categories</h1>
        <div
          v-if="todoStore.todoLists.length"
          :class="styles.categories"
          class="hover-category"
        >
          <div
            v-for="(list) in todoStore.todoLists"
            :key="list.idList"
            :class="styles.card"
          >
            <h2
              @click="openCategoryModal({
                idList: list.idList,
                category: list.category,
              })"
              class="editable-category"
            >
              {{ list.category }}
              <EditIcon />
            </h2>

            <!-- Display Tasks -->
            <TodoTask :categoryId="list.idList" :tasks="list.TodoTask || []" />
          </div>
        </div>
        <div v-else>
          <p>No categories added yet.</p>
        </div>
      </div>

      <!-- Category Modal -->
      <CategoryModal
        v-if="showCategoryModal && selectedCategory"
        :categoryName="selectedCategory.category"
        :onClose="closeCategoryModal"
        :onEdit="handleEditCategory"
        :onDelete="handleDeleteCategory"
      />
    </section>
  </div>
</template>



<style scoped>
.app-container {
  display: flex; 
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #161816; 
}

.main-content {
  flex: 1;
  padding: 20px;
}

.category {
  margin-bottom: 1rem;
}

.category h3 {
  margin: 0 0 0.25rem;
  font-weight: bold;
}

.category ul {
  list-style: none;
  padding-left: 0;
}

.category ul li {
  padding-left: 10px;
}
</style>
