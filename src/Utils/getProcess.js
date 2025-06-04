import axios from 'axios';

const getForProcessIdNumero = async (token, ano, Numeroprocesso) => {
    try {
        const response = await axios.post('http://localhost:3000/get-process-number', {
                numAno: ano,
                token,
                numProcess: Numeroprocesso
        })
        console.log('resposta > ', response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default getForProcessIdNumero;