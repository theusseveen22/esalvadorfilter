<template>
    <div class="botao">
        <router-link :to="linkPage">
        <img :src="urlImage" alt="Logo">
        <h3>{{ titulo }}</h3>
        <p>{{ descricao }}</p>
        </router-link>
    </div>
</template>
<script setup>
const props = defineProps({
    titulo: {
        type: String,
        defaut: "botão ...",
    },
        descricao: {
        type: String,
        defaut: "Descrição botão..."
    },
    urlImage: {
        type: String,
        defaut: "pasta...",
    },
    linkPage: {
        type: String,
        defaut: "pasta...",
    }
})
</script>
<style>
.botao {
    background-color: #006CB5;
  padding: 15px 25px;
  border-radius: 8px;
  min-width: 150px; /* Largura mínima antes de quebrar */
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.botao a {
  color:aliceblue;

}

.botao {
    min-width: 120px;
    padding: 10px 15px;
  }

  .botoes {
    width: 100%;
}
</style>