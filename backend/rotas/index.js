const express = require('express');
const { loginController } = require('../controller/LoginController');
const { getProcessNumberController } = require('../controller/CogelDataController');

const router = express.Router();

console.log(loginController);

router.post('/login', loginController);
router.post('/get-process-number', getProcessNumberController);

module.exports = router;