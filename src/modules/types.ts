export interface WeatherInfo {
    temp: number
    description: string
    image: string
}
export interface Forecast {
    date: string
    day: WeatherInfo
    night: WeatherInfo
    wind_speed: number
    rain_chance: number
}
export interface Todo {
    id: number
    text: string
    completed: boolean
}