const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.registerUser);

// Ruta para iniciar sesión
router.post('/login', userController.loginUser);

module.exports = router;
