import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import SubjectPage from './views/SubjectPage.vue'

const routes = [
  {
    path: '/',
    name: 'DomoweOgnisko',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: '/subject/:subjectId',
    name: 'Subject',
    component: SubjectPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
