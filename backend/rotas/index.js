const express = require('express');
const LoginController = require('../controller/LoginController');

const router = express.Router();

router.post('/login', LoginController);

module.exports = router;