// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';
import FindAllSec from '../pages/FindAllSec.vue';
import FindSector from '../pages/FindSector.vue';
import NotFound from '../pages/NotFound.vue';
import { useAuthStore } from '../store/authStore';
import Login from '../pages/Login.vue';
import axios from 'axios';
import hasOneHourPassed from '../Utils/verifyHour';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/pesquisa-setor', component: FindSector, meta: { requiresAuth: true } },
  { path: '/pesquisa-geral-secretaria', component: FindAllSec, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', name: 'login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore();
  
  if (auth.hour && hasOneHourPassed(auth.hour)) {
    auth.logout();
  }

  const tokenSalvo = localStorage.getItem('token');
  if (tokenSalvo && !auth.token) {
    auth.token = tokenSalvo;
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`;
  }

  if (to.meta.requiresAuth && !auth.token) {
    window.alert("É necessário fazer login para continuar");
    return { name: 'login' };
  }

  return true; 
});

export default router;
