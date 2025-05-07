// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';
import FindAllSec from '../pages/FindAllSec.vue';
import FindSector from '../pages/FindSector.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pesquisa-setor', component: FindSector },
  { path: '/pesquisa-geral-secretaria', component: FindAllSec},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
