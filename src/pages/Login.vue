<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const getCurrentTimestamp = () => {
  return Date.now();
}


const userApi = ref('')
const senha = ref('')
const auth = useAuthStore()
const router = useRouter()
const erro = ref('')

async function logar() {
  auth.hour = getCurrentTimestamp();
  try {
    await auth.login(userApi.value, senha.value);
    router.push('/home'); // ou a rota protegida
  } catch (e) {
    console.log('ENTREI NO ERRO ', erro.value);
    erro.value = 'Usuário ou senha inválido';
    console.log(e);
  }
}
</script>

<template>
  <div class="login">
  <form @submit.prevent="logar">
    <input v-model="userApi"  placeholder="Login" required />
    <input v-model="senha" type="password" placeholder="Senha" required />
    <button type="submit">Entrar</button>
    <p v-if="erro">{{ erro }}</p>
  </form>
  </div>
</template>

<style>
.login {
    display: flex;
    width: 100%;
    height: 500px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 50px;
    align-content: space-around;
    flex-direction: column;
  }

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgb(13, 98, 177);
  color: antiquewhite;
}

p {
  color: red;
  font-size: 14px;
}
</style>
