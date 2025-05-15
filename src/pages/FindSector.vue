<template lang="">
    <div>
        <h1>Página de busca por setor</h1>
            <span>Número do processo
            <input v-model="numero" type="text" placeholder="Digite o número do processo" /></span>
             <span><input v-model="ano" type="number" min="1900"/></span>
            <button @click="buscaProcesso">Buscar</button>
    </div>
</template>
<script setup>


</script>
<style lang="">

    
</style>