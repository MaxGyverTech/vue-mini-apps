<script setup lang="ts">
import {type Forecast }from '@/modules/types';
defineProps<{forecast: Forecast}>()
</script>

<template>
<div>
  <div style="font-size: 16px;">{{ forecast.date }}</div>

  <img v-bind:src="forecast.day.image">
  <div class="temp">{{ forecast.day.temp }}°C</div>
  <div>{{ forecast.day.description }}</div>

  <img v-bind:src="forecast.night.image">
  <div class="temp">{{ forecast.night.temp }}°C</div>
  <div>{{ forecast.night.description }}</div>

  <br>
  <div>Wind: {{ forecast.wind_speed }}m/s</div>
  <div>Rain chance: {{ forecast.rain_chance }}%</div>
</div>
</template>

<style scoped>
div {
  font-size: 1em;
}
.temp {
  font-size: 2em;
}
</style>