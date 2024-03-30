<script setup lang="ts">
import { ref, onMounted,  watch } from 'vue';
import { type Forecast } from './WeatherItem.vue';
import WeatherItem from './WeatherItem.vue';


const citySearch = ref('1')
const city = ref('')
const isLoading = ref(true)
const forecasts = ref([] as Forecast[])

let currentLocation: {lat: number, lon: number} = null!
navigator.geolocation.getCurrentPosition((position) => {
  currentLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
  citySearch.value = ''
}, (e)=>console.error(e), {maximumAge: 1000})
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

async function getForecast(location: string | { lat: number, lon: number} ) : Promise<{ city: string, forecasts: Forecast[] }> {
  let cityName = 'Current location';
  if (typeof location == 'string') {
    const cityR = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=ru&format=json`)
    const json = (await cityR.json())
    if (!('results' in json)) return { city: '', forecasts: [] }
    const data = json['results'][0]
    location = { lat: data['latitude'], lon: data['longitude'] }
    cityName = data['name']+', '+data['country']
  }
  location = location as { lat: number, lon: number}
  const forecastR = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max`)
  const data = (await forecastR.json())['daily']
  const forecasts = [] as Forecast[]
  for (let i=0; i<7; i++) {
    forecasts.push({
      date: data['time'][i],
      weather_code: data['weather_code'][i],
      temp_day: data['temperature_2m_max'][i],
      temp_night: data['temperature_2m_min'][i],
      rain_chance: data['precipitation_probability_max'][i],
      wind_speed: data['wind_speed_10m_max'][i]
    })
  }
  return { city: cityName, forecasts: forecasts }
}
onMounted(()=>citySearch.value = '')
</script>

<template>
<div id="wrapper">
    <h1>Weather App</h1>
    <input class="centered" type="text" v-model="citySearch" placeholder="Enter city">
    
    <div class="centered fade-in" :key="city">{{ city }}</div>
    <div id="forecasts">
      <p v-show="isLoading" class="loader "></p>
      <WeatherItem v-for="(forecast, index) in forecasts" class="fade-in" :style="{ animationDelay: index * 0.05 + 's' }" :key="city+forecast.date" :forecast="forecast"/>
    </div>
</div>
</template>

<style scoped>
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
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-in {
  animation: fade-in 0.5s forwards;
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
#forecasts {
  min-height: 100px;
  position: relative;
  display: flex;
  margin: 0 auto;
}
#forecasts > div {
  flex: 1;
  border: white 1px solid;
  padding: 5px;
  margin: 5px;
  font-size: 13px;
}
#wrapper {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
}
</style>