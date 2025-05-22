<template>
    <div class="container">
        <Botao 
        titulo="Pesquisar em toda secretaria"
        descricao="Pesquisar processos de toda a secretaria"
        :urlImage="iconSearchAll"
        :linkPage="'/pesquisa-geral-secretaria'"
        />
        <Botao 
        titulo="Pesquisar por processo"
        descricao="Pesquisar processos por um processo específico"
        :urlImage="iconSearchSector" 
        :linkPage="'/pesquisa-setor'"
        />
    </div>
</template>

<script setup>
import Botao from './Botao.vue';
import iconSearchAll from "../assets/icon-predio.png"
import iconSearchSector from '../assets/busca-setor.gif'
</script>

<style>
    .container {
  width: 100vw; /* Garante que ocupe toda a largura da tela */
  height: 80vh;
  background-color: #F5F8FA;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box; /* Para que o padding não ultrapasse a largura */
  align-content: flex-start;
}



/* Responsividade - ajusta conforme a tela diminui */
@media (max-width: 768px) {
  .container {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    flex-direction: column; /* Empilha verticalmente em telas muito pequenas */
    gap: 10px;
  }
}
</style>