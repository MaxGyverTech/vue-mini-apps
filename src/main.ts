import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import WeatherApp from './components/WeatherApp.vue'
import TodoApp from './components/TodoApp.vue'
import IndexView from './components/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})


const app = createApp(App)
app.use(router)
app.mount('#app')
