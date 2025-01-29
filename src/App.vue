<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { RouteName } from './enums/route-names';
</script>
<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink :to="{ name: RouteName.HOME }">Home</RouterLink>
        <RouterLink :to="{ name: RouteName.TODOLIST }">Go to App</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    max-height: 100vh;
    padding: 1rem 0;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    text-decoration: none;
  }

  nav a:first-of-type {
    border: 0;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  /*Layout ReviewRouter*/
  body,
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
  }

  main {
    flex: 0 0 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
