import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import SchedulePage from './views/SchedulePage.vue';
import SubjectsPage from './views/SubjectsPage.vue';
import SubjectDetailsPage from './views/SubjectDetailsPage.vue';
import UnhookingPage from './views/UnhookingPage.vue';
import ChoicePointPage from './views/ChoicePointPage.vue';
import ContractPage from './views/ContractPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: SchedulePage,
  },
  {
    path: '/subjects',
    name: 'SubjectsPage',
    component: SubjectsPage,
  },
  {
    path: '/subjects/:subjectId',
    name: 'SubjectDetailsPage',
    component: SubjectDetailsPage,
    props: true,
  },
  {
    path: '/unhooking',
    name: 'UnhookingPage',
    component: UnhookingPage,
  },
  {
    path: '/choice-point',
    name: 'ChoicePointPage',
    component: ChoicePointPage,
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
