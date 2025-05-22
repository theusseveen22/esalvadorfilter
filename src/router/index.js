// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';
import FindAllSec from '../pages/FindAllSec.vue';
import FindSector from '../pages/FindSector.vue';
import NotFound from '../pages/NotFound.vue';
import { useAuthStore } from '../store/authStore';
import Login from '../pages/Login.vue';
import axios from 'axios';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/pesquisa-setor', component: FindSector, meta: { requiresAuth: true } },
  { path: '/pesquisa-geral-secretaria', component: FindAllSec, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if(!auth.token) {
    const tokenSalvo = localStorage.getItem('token');
    if(tokenSalvo) {
      auth.token = tokenSalvo;
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`
    }
  }

  if(to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next();
  }
})

export default router
