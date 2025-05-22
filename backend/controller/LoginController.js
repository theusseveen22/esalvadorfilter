const validatUser = require('../model/Login');
require('dotenv').config();
const axios = require('axios');

const LoginController = async (req , res) => {
    console.log('REQ PONTO BODY  >    >  >>>>>>>>>>>>>>>>>>>>>', req.body);
    const { nome, password } = req.body;
    
    const token = process.env.TOKEN;

    const validaUsuario = validatUser(nome, password);
    
        const { validUser, validPassword } = validaUsuario;
    try {
            const response = await axios.post('https://apiesalvador.salvador.ba.gov.br/api/login',
        {
            'nome': validUser,
            'token': token,
            'password': validPassword
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
    res.status(200).json(response.data);
    
    } catch (error) {
        console.error('Erro ao fazer login na API:', error.message);
    }
}

module.exports = LoginController;