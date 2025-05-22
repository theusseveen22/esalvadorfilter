<template lang="">
    <div class="rodape">
        <h4>© 2025 - SECRETARIA DE INSFRAESTRUTURA E OBRAS PÚBLICAS • Desenvolvimento NTI - Desenvolvedor - Matheus Lima</h4> 
    </div>
</template>
<script setup>

</script>
<style>
.rodape {
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
    color: rgb(10, 67, 117);
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