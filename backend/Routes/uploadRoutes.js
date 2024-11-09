const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const uploadController = require('../Controllers/uploadController');

router.post('/', authMiddleware.verifyToken, uploadController.uploadFile);

module.exports = router;
