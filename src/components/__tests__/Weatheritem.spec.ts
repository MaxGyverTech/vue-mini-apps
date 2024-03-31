import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherItem from '@/components/WeatherItem.vue'

const forecast = {
    date: '2023-04-01',
    day: {
      temp: 20,
      image: 'http://openweathermap.org/img/wn/01d@2x.png',
      description: 'Sunny'
    },
    night: {
      temp: 10,
      image: 'http://openweathermap.org/img/wn/01n@2x.png',
      description: 'Clear'
    },
    wind_speed: 5,
    rain_chance: 10
}

describe('WeatherItem', () => {
  it('should contain date, two "°C" and images', () => {
    
    const wrapper = mount(WeatherItem, {
      props: { forecast: forecast }
    })

    const text = wrapper.text()

    expect(text.match(/°C/g)).toHaveLength(2)

    wrapper.findAll('img').forEach(element => {
      expect([forecast.day.image, forecast.night.image])
        .toContain(element.attributes('src'))
    })
  })
})