const express = require('express');
const { registerUser, verifyCode, resendCode, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendCode); // Asegúrate de tener esta ruta
router.post('/login', loginUser);

module.exports = router;
