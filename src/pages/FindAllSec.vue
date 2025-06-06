<template lang="">
    <div class="content">
    <input
        v-if="groups.length > 0"
        v-model="grupoFiltro"
        @input="filterForGroup(grupoFiltro)"
        placeholder="Filtrar por grupo"
    />
    <div class="setores-container"
    v-if="groups.length > 0"
    v-for="(element, index) in groups"
    :key="index"
    >
        <h2>
           Setor: {{ element.unidade_sigla_origem }}
        </h2>
        <h3>
            Processos em aberto no setor: {{ element.vezes_que_aparece }}
        </h3>
        <p>
            Média de dias de processos abertos: {{ element.media_de_dias }}
        </p>
        <p>
            Assunto: {{ element.grupoNome }}
        </p>
    </div>
    <div v-if="listaSetores" class="search-all-content">
        <button class="botao-busca" @click.prevent="searchAllSec" >Iniciar processamento de dados</button>
    </div>
    <center>
        <p v-if="loading" >{{ statusMessageSearch }}</p>
        <br>
        <a href="" v-if="loading" @click.prevent="cancelarBusca" :disabled="!isRunning">Clique aqui caso queira parar a busca</a></center>
    </div>
</template>
<script setup>
import getForProcessIdNumero from '../Utils/getProcess';
import axios from 'axios';
const token = localStorage.getItem('token');
import { ref } from 'vue';

const loading = ref(null);
const statusMessageSearch = ref(null);
const isRunning = ref(false);
const shouldStop = ref(false);
const listaSetores = ref([]);
const groups = ref([]);
const grupoFiltro = ref("");

console.log(groups.value);

const filterForGroup = () => {
    if(!grupoFiltro.value || grupoFiltro.value.trim() === ""){
        groups.value = listaSetores.value;
    } else {
        groups.value = listaSetores.value.filter(
            (element) => element.grupoNome.toLowerCase().includes(grupoFiltro.value.toLowerCase())
        )}
}

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

            // Faz requisição para a api um único processo por vez
            const dataProcessoUnico = await getForProcessIdNumero(token, element.ano, element.numero);
            // pega a sigla da unidade
            const unidade = dataProcessoUnico.processo.unidade_sigla_origem;
            // pega a sigla do grupo
            const grupoUnidade = dataProcessoUnico.processo.grupo_descricao;

            // Cria outro objeto filtrando apenas pelos dados que quero unidade, grupo e faz a média de dias também adiciona o processo
            if (!agrupamento[unidade]) {
                agrupamento[unidade] = {
                    unidade_sigla_origem: unidade,
                    quantidade: 0,
                    totalDias: 0,
                    processos: [],
                    grupoDescricao: grupoUnidade,
                };
            }

            agrupamento[unidade].quantidade++;
            agrupamento[unidade].totalDias += dataProcessoUnico.processo.dias;
            agrupamento[unidade].processos.push(element);
            agrupamento[unidade].grupoDescricao
        }

        const resultado = Object.values(agrupamento).map(grupo => ({
            unidade_sigla_origem: grupo.unidade_sigla_origem,
            vezes_que_aparece: grupo.quantidade,
            media_de_dias: grupo.totalDias / grupo.quantidade,
            processos_totais: grupo.processos,
            grupoNome: grupo.grupoDescricao
        }));
        listaSetores.value = resultado;
        groups.value = listaSetores.value;
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
.content {
    width: 100vw;
    height: 80vh;
}
.search-all-content {
    display: flex;
 
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