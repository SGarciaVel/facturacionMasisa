const express = require('express');
const multer = require('multer');
const csvController = require('../Controllers/csvController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Guarda archivos subidos en la carpeta 'uploads'

// Ruta para cargar y procesar un archivo .csv
router.post('/upload', upload.single('file'), csvController.processCsv);

module.exports = router;
