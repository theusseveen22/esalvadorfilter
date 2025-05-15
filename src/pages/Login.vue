<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const userApi = ref('')
const senha = ref('')
const auth = useAuthStore()
const router = useRouter()
const erro = ref('')

const logar = async () => {
  try {
    await auth.login(userApi.value, senha.value)
    router.push('/') // ou a rota protegida
  } catch (e) {
    erro.value = e.message
  }
}
</script>

<template>
  <form @submit.prevent="logar">
    <input v-model="userApi"  placeholder="Email" required />
    <input v-model="senha" type="password" placeholder="Senha" required />
    <button type="submit">Entrar</button>
    <p v-if="erro">{{ erro }}</p>
  </form>
</template>