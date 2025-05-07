<template lang="">
    <div class="header">
        <div class="header-left">
            <router-link to="/">Início</router-link> | 
    <router-link to="/pesquisa-setor">Pesquisa Setor</router-link> | 
    <router-link to="/pesquisa-geral-secretaria">Pesquisa Geral</router-link>
        </div>
        <div class="header-right">
            <h2>Header right</h2>
        </div>        
    </div>
</template>
<script setup>

</script>
<style>
.header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: center;
    align-items: flex-start;
    width: 100vw; /* 100% da largura da viewport */
    margin-left: -50vw; /* Corrige possíveis espaçamentos */
    left: 50%;
    position: relative;
    background-color: #006CB5;
    color: aliceblue;
}

.header-left {
    width: 40%;
    display: flex;
}

.header-right {
    width: 40%;
    display: flex;
    justify-content: flex-end;
}


</style>