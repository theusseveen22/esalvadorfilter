// stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    hour: null,
    logado: false
  }),
  actions: {
    async login(userEsalvador, senha) {
      try {
        const response = await axios.post('http://localhost:3000/login',
    {
      nome: userEsalvador,
      password: senha,
    })

        this.token = response.data.access_token;

        // Armazena o token no localStorage (opcional)
        localStorage.setItem('token', this.token)

        // Define token no axios para futuras requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        this.logado = true;

      } catch (error) {
        this.logado = false;
        localStorage.removeItem('token')
       return {error: 401};
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      this.logado = false;
    },
    carregarToken() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  }
})