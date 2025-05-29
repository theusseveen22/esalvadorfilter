<template lang="">
    <div>
        <h1><a href="#" @click.prevent="searchAllSec" >Página de busca toda secretaria</a></h1>
    </div>
</template>
<script setup>
import axios from 'axios';
const token = localStorage.getItem('token');

const searchAllSec = async () => {
    console.log('chamei a função');
    try {
        const response = await axios.post('http://localhost:3000/get-process-all', {
        token
    }) 
    
    console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    
}

</script>
<style lang="">
    
</style>