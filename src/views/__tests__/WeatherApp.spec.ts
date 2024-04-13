import { describe, it, expect, vi } from 'vitest';
import { mount,flushPromises } from '@vue/test-utils';
import WeatherApp from '@/views/WeatherApp.vue';
import WeatherItem from '@/components/WeatherItem.vue';
import { getForecast } from '@/modules/api';

vi.mock('@/modules/api', () => ({
  getForecast: vi.fn(() => Promise.resolve({
    city: 'Test City',
    forecasts: [
      {
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
    ]
  }))
}));

describe('WeatherApp', () => {
  it('loads forecasts on search', async () => {
    const wrapper = mount(WeatherApp);
    expect(wrapper.find('.loader').exists()).toBe(false);
    
    await wrapper.get('input[type="text"]').setValue('Test C');
    expect(wrapper.find('.loader').exists()).toBe(true);
    expect(getForecast).toBeCalledTimes(2);

    await flushPromises();

    expect(await wrapper.find('.loader').exists()).toBe(false);
    const forecastItems = await wrapper.findAllComponents(WeatherItem);
    expect(forecastItems).toHaveLength(1);
  });
});