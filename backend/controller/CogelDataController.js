const { getProcessNumber } = require('../model/CogelData');
const axios = require('axios');

const getProcessNumberController = async (req, res) => {
    const { numAno, token, numProcess } = req.body;
    const processo = getProcessNumber(numAno, numProcess);

    console.log('ano > ', numAno, 'numprocesso ', numProcess);
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };
        const [processoGeral, tramite] = await Promise.all([
            axios.get(`https://apiesalvador.salvador.ba.gov.br/api/consulta/${parseInt(processo.numero)}/${parseInt(processo.ano)}`, { headers }),
            axios.get(`https://apiesalvador.salvador.ba.gov.br/api/historico-tramitacao/${processo.numero}/${processo.ano}`, { headers })
        ]);
        res.status(200).json({
            processo: processoGeral.data,
            tramite: tramite.data
        });

    } catch (error) {
        console.log("Código: ", error.response.status);
        res.status(500).json({ error: 'Erro na requisição externa' });
    }
};

const getAllSec = async (req, res) => {
    const { token } = req.body;
    const allData = [];
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };

        let page = 1; // Mova para fora do loop
        let lastPage = 1; // Inicialize lastPage
        let response; // Declare response fora do loop

        do {
            response = await axios.get(
                `https://apiesalvador.salvador.ba.gov.br/api/filtra-processos?ano=2025&orgao=5913&status=2&page=${page}`, 
                { headers }
            );
            
            allData.push(...response.data.data); // Assumindo que os dados estão em response.data.data
            lastPage = response.data.last_page; // Atualize lastPage com a resposta da API
            page++;
        } while (page <= lastPage);
        
        res.status(200).json(allData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error: Requisição retornou inválido' });
    }
};

module.exports = {
    getProcessNumberController,
    getAllSec
};