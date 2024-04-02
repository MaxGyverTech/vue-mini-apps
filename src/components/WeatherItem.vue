<script setup lang="ts">
import {type Forecast }from '@/modules/types';
defineProps<{forecast: Forecast}>()
</script>

<template>
<div class="wrapper">
  
  <div>
    <img v-bind:src="forecast.day.image">
    <div class="temp">{{ forecast.day.temp }}°C</div>
    <div>{{ forecast.day.description }}</div>
  </div>
  
  <div>
    <img v-bind:src="forecast.night.image">
    <div class="temp">{{ forecast.night.temp }}°C</div>
    <div>{{ forecast.night.description }}</div>
  </div>
  
  <br>
  <div class="info">
    <div>Wind: {{ forecast.wind_speed }}m/s</div>
    <div>Rain chance: {{ forecast.rain_chance }}%</div>
    <div style="font-size: 1.25em;">{{ forecast.date }}</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  flex: 1;
  border: white 1px solid;
  padding: 5px;
  margin: 5px;
  font-size: 13px;
  @media (max-width: 1000px) {
    flex-direction: row;
  }
}
.info {
  @media (max-width: 1000px) {
    font-size: 16px;
  }
}
div {
  font-size: 1em;
}
.temp {
  font-size: 2em;
}
</style>