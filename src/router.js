import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import SubjectsPage from './views/SubjectsPage.vue';
import UnhookingPage from './views/UnhookingPage.vue';
import ContractPage from './views/ContractPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/subjects',
    name: 'SubjectsPage',
    component: SubjectsPage,
  },
  {
    path: '/unhooking',
    name: 'UnhookingPage',
    component: UnhookingPage,
  },
  {
    path: '/contract',
    name: 'ContractPage',
    component: ContractPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
