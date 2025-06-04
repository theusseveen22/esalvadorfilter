<template lang="">
    <div>
        <h1><a href="#" @click.prevent="searchAllSec" >Página de busca toda secretaria</a></h1>
        <p v-if="loading" >{{ loading }}</p>
    </div>
</template>
<script setup>
import getForProcessIdNumero from '../Utils/getProcess';
import axios from 'axios';
const token = localStorage.getItem('token');
import { ref } from 'vue';

const loading = ref(null)

const searchAllSec = async () => {
    try {
        loading.value = 'Buscando...';    
        const response = await axios.post('http://localhost:3000/get-process-all', {
        token
    }) 
    const dataProcessoUnico = await getForProcessIdNumero(token, response.data.data[0].ano, response.data.data[0].numero);
    console.log('UNICO PROCESSO > ', dataProcessoUnico);
    
    /* response.data.data.forEach(element => {
        console.log(element.id_processo);
    }); */
    } catch (error) {
        console.log(error);
    }
    loading.value = null;
}

</script>
<style>
    
</style>