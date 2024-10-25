import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'DomoweOgnisko',
    component: HomePage
  },
  // Add other internal routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
