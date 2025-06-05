<template lang="">
    <div class="search-all-content">
        <button class="botao-busca" @click.prevent="searchAllSec" >Iniciar processamento de dados</button>
    </div>
    <center>
        <p v-if="loading" >{{ statusMessageSearch }}</p>
        <br>
        <a href="" v-if="loading" @click.prevent="cancelarBusca" :disabled="!isRunning">Clique aqui caso queira parar a busca</a></center>
</template>
<script setup>
import getForProcessIdNumero from '../Utils/getProcess';
import axios from 'axios';
const token = localStorage.getItem('token');
import { ref } from 'vue';

const loading = ref(null);
const statusMessageSearch = ref(null)
const isRunning = ref(false);
const shouldStop = ref(false);
const listaSetores = ref([]);

const cancelarBusca = () => {
  shouldStop.value = true;
};

const searchAllSec = async () => {
    try {   
            loading.value = true;
           statusMessageSearch.value = 'Buscando...';
            isRunning.value = true;
            shouldStop.value = false;
        const response = await axios.post('http://localhost:3000/get-process-all', { token });
        
        const agrupamento = {};
        
        for (const element of response.data.data) {

              if (shouldStop.value) {
                statusMessageSearch.value = 'Busca pausada pelo usuário';
                break;
            }
            console.log('elemento ano ', element.ano, 'elemento numero', element.numero);
            const dataProcessoUnico = await getForProcessIdNumero(token, element.ano, element.numero);
            console.log('UNIDADE SIGLA ', dataProcessoUnico.processo.unidade_sigla_origem);
            const unidade = dataProcessoUnico.processo.unidade_sigla_origem;

            if (!agrupamento[unidade]) {
                agrupamento[unidade] = {
                    unidade_sigla_origem: unidade,
                    quantidade: 0,
                    totalDias: 0,
                    processos: []
                };
            }

            agrupamento[unidade].quantidade++;
            agrupamento[unidade].totalDias += dataProcessoUnico.processo.dias;
            agrupamento[unidade].processos.push(element);
        }

        const resultado = Object.values(agrupamento).map(grupo => ({
            unidade_sigla_origem: grupo.unidade_sigla_origem,
            vezes_que_aparece: grupo.quantidade,
            media_de_dias: grupo.totalDias / grupo.quantidade,
        }));

        listaSetores.value = resultado;
        return resultado;
    } catch (error) {
        console.error("Erro na busca:", error);
        loading.value = null;
        throw error;
    } finally {
        loading.value = null;
    }
};


</script>
<style>

.search-all-content {
    display: flex
;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    width: 100%;
    height: 300px;
}

.search-all-content button {
    width: 300px;
    margin: 2px;
    height: 100px;
}
    
</style>