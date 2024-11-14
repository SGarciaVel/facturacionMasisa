const express = require('express');
const { registerUser, verifyCode, resendCode, loginUser, getUserData } = require('../Controllers/userController'); // Importa todo dsd controllers
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', verifyToken, getUserData); // Ruta protegida para obtener datos del usuario
router.post('/register', registerUser);
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendCode);
router.post('/login', loginUser);

module.exports = router;