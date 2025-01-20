<script setup lang="ts">
import { useTodoStore } from '@/stores/store';

// Access the store
const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-view-container">
    <h2>View Only: Categories and Tasks</h2>

    <div v-if="todoStore.todoLists.length" class="categories">
      <!-- Loop through categories -->
      <div v-for="category in todoStore.todoLists" :key="category.idList" class="category">
        <h3>{{ category.category }}</h3>

        <ul>
          <!-- Loop through tasks within each category -->
          <li v-for="task in category.TodoTask || []" :key="task.idTask">
            {{ task.task }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>No categories or tasks available.</p>
    </div>
  </div>
</template>

<style scoped>
.todo-view-container {
  padding: 20px;
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%; 
}

.categories {
  margin-top: 20px;
}

.category {
  margin-bottom: 20px;
}

.category h3 {
  margin-bottom: 10px;
  color: #007bff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  border-bottom: 1px solid #555;
  padding: 5px 0;
}
</style>
