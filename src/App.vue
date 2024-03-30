<script setup lang="ts">
import TodoApp from '@/components/TodoApp.vue';
import WeatherApp from '@/components/WeatherApp.vue';
</script>

<template>
  <WeatherApp/>
  <TodoApp/>
</template>

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