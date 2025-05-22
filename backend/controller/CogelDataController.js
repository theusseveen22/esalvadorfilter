const getProcessNumber = require('../model/CogelData');
const axios = require('axios');

const getProcessNumberController = async (req, res) => {
    const { numAno, token, numProcess } = req.body;

    const validatToken = getProcessNumber(token);

    console.log(' TOKEN ', token, 'NUMANO ', numAno, ' PROCESS ', numProcess);
        try {
            const response = await axios.get(`https://apiesalvador.salvador.ba.gov.br/api/consulta/${numProcess}/${numAno}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                }
            });
            console.log('ENTREI AQUI >');
            res.status(200).json(response.data);
            console.log('RESPOSTA:', response.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro na requisição externa' });
        }
};

module.exports = {
    getProcessNumberController
};