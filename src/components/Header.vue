<template lang="">
    <div class="header">
        <div class="header-left">
            <router-link to="/home">Início |</router-link> 
    <router-link to="/pesquisa-setor">Pesquisar processo único |</router-link> 
    <router-link to="/pesquisa-geral-secretaria">Pesquisa Geral Secretaria</router-link>
        </div>
        <div class="header-right">
             <router-link to="/">Sobre o aplicativo </router-link>
             <router-link @click.prevent="deslogar" to="/">Logout</router-link>
        </div>        
    </div>
</template>
<script setup>
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore();

const deslogar = () => {
    auth.logout();
}


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

.header-left a,
.header-right a  {
    color: aliceblue;
    font-size: 18px;
    padding: 10px;
    margin-top: 15px;
    text-decoration: none;
}

.header-left a:hover, 
.header-right a:hover {
    color: rgb(197, 213, 228);
    font-weight: bold;
    padding: 10px;
    margin-top: 15px;
    text-decoration: none;
}


</style>