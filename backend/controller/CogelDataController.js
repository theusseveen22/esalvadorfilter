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

    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };
        const response = await axios.get('https://apiesalvador.salvador.ba.gov.br/api/filtra-processos?ano=2025&orgao=5913&status=2', {headers })
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error: Requisição retornou inválido'})
    }
}

module.exports = {
    getProcessNumberController,
    getAllSec
};