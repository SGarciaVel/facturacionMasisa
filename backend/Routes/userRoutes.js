const express = require('express');
const { registerUser, verifyCode, resendCode, loginUser, getUserData } = require('../Controllers/userController'); // Importa todo dsd controllers
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user.rows[0]); // Devuelve los datos del usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos del usuario' });
    }
});

router.post('/register', registerUser);
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendCode);
router.post('/login', loginUser);

module.exports = router;

