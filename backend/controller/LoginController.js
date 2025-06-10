const { validatUser } = require('../model/Login');
require('dotenv').config();
const axios = require('axios');

const loginController = async (req , res) => {
    console.log('REQ PONTO BODY  >    >  >>>>>>>>>>>>>>>>>>>>>', req.body);
    const { nome, password } = req.body;
    
    const token = process.env.TOKEN;

    const user = validatUser(nome, password);

    console.log(user.nome, 'password', user.password, 'token', token);

    try {
            const response = await axios.post('https://apiesalvador.salvador.ba.gov.br/api/login',
        {
            'nome': user.nome,
            'token': token,
            'password': user.password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
    res.status(200).json(response.data);
    
    } catch (error) {
        res.status(401).json(error.status);
        console.error('Erro ao fazer login na API:', error.status);
    }
}

module.exports = { loginController }