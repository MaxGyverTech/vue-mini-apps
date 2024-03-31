import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/main"
import { test, expect } from 'vitest'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

test('routing', async () => {
  router.push('/')
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.text()).toContain('Route to mini apps')

  await wrapper.find('a').trigger('click')
  await flushPromises()
  expect(wrapper.text()).toContain('Todo app')
})