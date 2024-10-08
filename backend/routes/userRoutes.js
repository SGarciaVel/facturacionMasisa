const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para registro de usuario
router.post('/register', userController.register);

module.exports = router;

// Ruta para iniciar sesión
router.post('/login', userController.login);
