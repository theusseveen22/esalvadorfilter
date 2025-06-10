<template lang="">
    <div class="content">
    <input
        v-if="inputVisible"
        v-model="grupoFiltro"
        @input="filterForGroup()"
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
            Tramitações em aberto no setor: {{ element.vezes_que_aparece }}
        </h3>
        <p>
            Média de dias de processos abertos: {{ element.media_de_dias.toFixed(2) }}
        </p>
        <p>
            Assunto: {{ element.grupoNome }}
        </p>
    </div>
    <div v-if="listaSetores <= 0" class="search-all-content">
        <button class="botao-busca" @click.prevent="searchAllSec">Iniciar processamento de dados</button>
    </div>

        <p v-if="loading" class="msg-loading" >{{ statusMessageSearch }}</p>

        <a href="" class='msg-break' v-if="loading" @click.prevent="cancelarBusca" :disabled="!isRunning">Parar Busca</a>
    </div>
</template>
<script setup>
import getForProcessIdNumero from '../Utils/getProcess';
import axios from 'axios';
const token = localStorage.getItem('token');
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const loading = ref(false);
const statusMessageSearch = ref(null);
const isRunning = ref(false);
const shouldStop = ref(false);
const listaSetores = ref([]);
const groups = ref([]);
const grupoFiltro = ref("");
const auth = useAuthStore();
const router = useRouter();
const inputVisible = ref(false);

const filterForGroup = () => {
    console.log('GROUP >', groups.value)
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

onMounted(() => {
    if(!auth.logado) router.push('/login');
})

const searchAllSec = async () => {
        const agrupamento = [];
        try {
            loading.value = true;
           statusMessageSearch.value = 'Buscando...';
            isRunning.value = true;
            shouldStop.value = false;
            const response = await axios.post('http://localhost:3000/get-process-all', { token });
                for (const element of response.data) {

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
        listaSetores.value = resultado.sort((a,b) => a.media_de_dias - b.media_de_dias);
        groups.value = listaSetores.value;
        inputVisible.value = true;
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

.msg-loading {
      position: absolute; /* ou use fixed, se quiser fixo em relação à tela inteira */
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  width: 150%;
  max-width: 100px;
  padding: 10px;
  top: 200px;
}

.msg-break {
      position: absolute; /* ou use fixed, se quiser fixo em relação à tela inteira */
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  width: 300px;
  max-width: 100px;
  padding: 10px;
  top: 250px;
  height: 100px;
}


.content {
    width: 100vw;
    height: 100vh;   
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.content input {
  position: absolute; /* ou use fixed, se quiser fixo em relação à tela inteira */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 80%;
  max-width: 400px;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-all-content {
    position: absolute; /* ou use fixed, se quiser fixo em relação à tela inteira */
  top: 10;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 80%;
  max-width: 400px;
  padding: 10px;
  border-radius: 8px;
  height: 300px;
}

.search-all-content button {
    width: 300px;
    margin: 2px;
    height: 100px;
}
    

.setores-container {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.setores-container:hover {
  transform: translateY(-3px);
}

.setores-container h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.setores-container h2 {
  font-size: 1rem;
  color: #666;
}

.setores-container p {
  margin: 0.25rem 0;
}
</style>