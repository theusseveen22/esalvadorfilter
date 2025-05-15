const validatUser = require('../model/Login');
require('dotenv').config();
const axios = require('axios');

const LoginController = async (req , res) => {
    const { nome, password } = req.body;
    console.log('body : ', nome ,' ', password);
    const token = process.env.TOKEN;

    try {
        const response = await axios.post(
        'https://apiesalvador.salvador.ba.gov.br/api/login',
        {
            'nome': nome,
            'token': token,
            'password': password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    res.status(200).json(response.data);
    
} catch (error) {
    console.error('Erro ao fazer login na API:', error.message);
}
    

}

module.exports = LoginController;