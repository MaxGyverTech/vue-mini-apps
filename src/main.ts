import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import WeatherApp from './views/WeatherApp.vue'
import TodoApp from './views/TodoApp.vue'
import IndexView from './views/IndexView.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
      path: '/todo',
      name: 'todo',
      component: TodoApp
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherApp
  }
]

const app = createApp(App)
app.use(createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
}))
app.mount('#app')
