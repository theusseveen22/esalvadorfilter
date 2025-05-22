const express = require('express');
const LoginController = require('../controller/LoginController');
const { getProcessNumberController } = require('../controller/CogelDataController');

const router = express.Router();

router.post('/login', LoginController);
router.post('/get-process-number', getProcessNumberController);

module.exports = router;