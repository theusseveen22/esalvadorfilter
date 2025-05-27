const { getProcessNumber } = require('../model/CogelData');
const axios = require('axios');

const getProcessNumberController = async (req, res) => {
    const { numAno, token, numProcess } = req.body;
    const processo = getProcessNumber(numAno, numProcess);

    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };

        // Duas requisições paralelas (mais rápido)
        const [processoGeral, tramite] = await Promise.all([
            axios.get(`https://apiesalvador.salvador.ba.gov.br/api/consulta/${processo.numero}/${processo.ano}`, { headers }),
            axios.get(`https://apiesalvador.salvador.ba.gov.br/api/historico-tramitacao/${processo.numero}/${processo.ano}`, { headers })
        ]);

        // Uma única resposta com os dois resultados
        res.status(200).json({
            processo: processoGeral.data,
            tramite: tramite.data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro na requisição externa' });
    }
};

module.exports = {
    getProcessNumberController
};