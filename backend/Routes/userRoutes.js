const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/register', userController.registerUser);
router.post('/verify-code', userController.verifyCode);


// Ruta para iniciar sesión
router.post('/login', userController.loginUser);

module.exports = router;