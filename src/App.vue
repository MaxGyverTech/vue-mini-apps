<script setup lang="ts">
import TodoApp from '@/components/TodoApp.vue';
import WeatherApp from '@/components/WeatherApp.vue';
</script>

<template>
  <div id="links">
    <RouterLink to="/todo">Todo</RouterLink>
    <RouterLink to="/weather">Weather</RouterLink>
  </div>

  <RouterView />
</template>

<style scoped>
a {
  color: white;  
  margin: 0 10px;
  font-size: 28px;
}
#links {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>

<style>
* { font-size: 24px; font-weight: bold; }
body {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  word-spacing: 1px;
  background-color: #1a1a1a;
  color: rgb(247, 239, 224);
}
h1 {text-align: center; font-size: 50px;}
</style>