import { describe, it, expect } from 'vitest';
import { getForecast } from '@/modules/api';

describe('getForecast function', () => {
  it('search by start of city name', async () => {
    const location = 'Моск';
    const result = await getForecast(location);

    expect(result.city).toBe('Москва, Россия');
    expect(result.forecasts).toHaveLength(7);
  });
  it('empty results for non-existent city', async () => {
    const location = 'Нижний южнотагиевск';
    const result = await getForecast(location);

    expect(result.city).toBe('');
    expect(result.forecasts).toHaveLength(0);
  });
  it('empty results for empty seacrh', async () => {
    const location = '';
    const result = await getForecast(location);

    expect(result.city).toBe('');
    expect(result.forecasts).toHaveLength(0);
  });
});