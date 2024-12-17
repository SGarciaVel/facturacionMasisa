const express = require('express');
const multer = require('multer');
const csvController = require('../Controllers/csvController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Guarda archivos subidos en la carpeta 'uploads'

router.post('/upload', upload.single('file'), csvController.processCsv);

module.exports = router;
