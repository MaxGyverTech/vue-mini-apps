<script setup lang="ts">
import { ref,  watch } from 'vue';
import { getForecast } from '@/modules/api'
import {type Forecast }from '@/modules/types';
import WeatherItem from '@/components/WeatherItem.vue';


const citySearch = ref('')
const city = ref('')
const isLoading = ref(false)
const forecasts = ref([] as Forecast[])

let currentLocation: {lat: number, lon: number} = null!
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    currentLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
    citySearch.value = ''
  }, (e)=>console.error(e))
}

watch(citySearch, async () => {
  isLoading.value = true
  let f: {city: string, forecasts: Forecast[]} = null!
  if (citySearch.value == '' && currentLocation != null) 
      f = await getForecast(currentLocation)
  else f = await getForecast(citySearch.value)
  city.value = f.city
  forecasts.value = f.forecasts
  isLoading.value = false
})
</script>

<template>
<div id="wrapper">
    <h1>Weather App</h1>
    <input class="centered" type="text" v-model="citySearch" placeholder="Enter city"> 
    
    <div class="fade-in" style="margin-top: 15px;" :key="city">{{ city }}</div>
    <div id="forecasts">
      <p v-if="isLoading" class="loader "></p>
      <WeatherItem v-for="(forecast, index) in forecasts" class="fade-in" :style="{ animationDelay: index * 0.05 + 's' }" :key="city+forecast.date" :forecast="forecast"/>
    </div>
</div>
</template>

<style scoped lang="scss">
.loader {
  transition: 0.1s;
  position: absolute;
  left: calc(50% - 30px);
  top: calc(50% - 60px);
  border: 10px solid #5e5e5e; 
  border-top: 10px solid #d8d8d8; 
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}
.fade-in {
  animation: fade-in 0.5s forwards;
}
#forecasts {
  min-height: 100px;
  position: relative;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.centered {
  display: block;
  margin: 0 auto;
}

#wrapper {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>