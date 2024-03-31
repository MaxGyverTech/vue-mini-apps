import weatherCodes from '@/assets/weatherCodes.json';
import { type Forecast } from './types';

const wc = weatherCodes as {[code: string]: { day: { description: string; image: string; }; night: { description: string; image: string; }; }}

export async function getForecast(location: string | { lat: number, lon: number} ) : Promise<{ city: string, forecasts: Forecast[] }> {
    let cityName = 'Current location';
    if (typeof location == 'string') {
      const cityR = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=ru&format=json`)
      const json = (await cityR.json())
      if (!('results' in json)) 
        return { city: '', forecasts: [] }
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
        day: {
          temp: data['temperature_2m_max'][i],
          description: wc[data['weather_code'][i]].day.description,
          image: wc[data['weather_code'][i]].day.image
        },
        night: {
          temp: data['temperature_2m_min'][i],
          description: wc[data['weather_code'][i]].night.description,
          image: wc[data['weather_code'][i]].night.image
        },
        rain_chance: data['precipitation_probability_max'][i],
        wind_speed: data['wind_speed_10m_max'][i]
      })
    }
    return { city: cityName, forecasts: forecasts }
}