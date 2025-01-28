<script lang="ts" setup>
  const traineeName = 'Jazel C. Equia';
  const traineeDate = 'January 16, 2025';
</script>

<template>
  <div class="trainee-info">
    <div class="info-line">
      <h2>Name:</h2>
      <h3>{{ traineeName }}</h3>
    </div>
    <div class="info-line">
      <h2>Date:</h2>
      <h3>{{ traineeDate }}</h3>
    </div>
  </div>
</template>

<style scoped>
  .trainee-info {
    display: flex;
    padding-top: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .info-line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
</style>
