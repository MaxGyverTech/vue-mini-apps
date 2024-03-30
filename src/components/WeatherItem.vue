<script setup lang="ts">
import weatherCodes from '@/assets/weatherCodes.json';
import { ref } from 'vue'
export interface Forecast {
  date: string
  temp_day: number
  temp_night: number
  weather_code: string
  wind_speed: number
  rain_chance: number
}
const wc = weatherCodes as {[code: string]: { day: { description: string; image: string; }; night: { description: string; image: string; }; }}
// defineEmits<{
//   changed: [todo: Todo]
//   delete: [todo: Todo]
// }>()

const props = defineProps<{forecast: Forecast}>()
</script>

<template>
<div>
  <div style="font-size: 16px;">{{ forecast.date }}</div>

  <img v-bind:src="wc[forecast.weather_code].day.image">
  <div class="temp">{{ forecast.temp_day }}°C</div>
  <div>{{ wc[forecast.weather_code].day.description }}</div>

  <img v-bind:src="wc[forecast.weather_code].night.image">
  <div class="temp">{{ forecast.temp_night }}°C</div>
  <div>{{ wc[forecast.weather_code].night.description }}</div>

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