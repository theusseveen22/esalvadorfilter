<template lang="">
    <div class="body-find-sec">
        <h1>Página de busca por setor</h1>
            <span>Número do processo: 
            <input type="number" placeholder="Número do processo" v-model="numProcess" required></span>
            <span>Ano: 
            <input type="number"  min="1900" max="2099" step="1" id="exampleInputAno" placeholder="2024" v-model="ano" required></span>
            
            <button @click="getForProcess">Buscar</button>
    </div>
</template>
<script setup>

import { ref } from 'vue';
import axios from 'axios';
const token = localStorage.getItem('token');

const ano = ref('');
const numProcess = ref('');

console.log('TOKEN :', token);

const getForProcess = async () => {
    try {
        const response = await axios.post(`http://localhost:3000/get-process-number`, {
                numAno: ano.value,
                token,
                numProcess: numProcess.value
        })
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}

</script>
<style>
.body-find-sec {
    width: 100vw; /* Garante que ocupe toda a largura da tela */
    height: 80vh;
}
    
</style>