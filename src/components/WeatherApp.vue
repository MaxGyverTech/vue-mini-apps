<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { type Forecast } from './WeatherItem.vue';
import WeatherItem from './WeatherItem.vue';
interface City {
  lat: number
  lon: number
  name: string
  country: string
  timezone: string
}
const citySearch = ref('1')
const city = ref('')
const forecasts = ref([] as Forecast[])

let currentLocation: {lat: number, lon: number} = null!
navigator.geolocation.getCurrentPosition((position) => {
  currentLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
  citySearch.value = ''
}, (e)=>console.error(e), {maximumAge: 1000})
watch(citySearch, async () => {
  let f: {city: string, forecasts: Forecast[]} = null!
  if (citySearch.value == '' && currentLocation != null) 
      f = await getForecast(currentLocation)
  else f = await getForecast(citySearch.value)
  city.value = f.city
  forecasts.value = f.forecasts
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
    <div class="centered">{{ city }}</div>

    <div id="forecasts">
      <WeatherItem v-for="forecast in forecasts" :key="forecast.date" :forecast="forecast"/>
    </div>
</div>
</template>

<style scoped>
.centered {
  display: block;
  margin: 0 auto;
}
#forecasts {
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
}
</style>