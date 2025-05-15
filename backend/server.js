const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => 
    console.log('Servidor iniciado na porta 3000')
);

module.exports = app;