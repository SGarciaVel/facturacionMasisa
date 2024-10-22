const pool = require('../db');
const bcrypt = require('bcryptjs');

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario ya existe (puedes hacer esto en tu base de datos)
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado', user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};
