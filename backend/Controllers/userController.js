const jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('bcryptjs');

// Función para generar un JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', 
            [username, hashedPassword, email]
        );
        

        res.status(201).json({ message: 'Usuario registrado', user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario en la base de datos por su email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Correo no encontrado' });
        }

        const user = userResult.rows[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = generateToken(user.id);

        // Si todo es correcto, responde con un mensaje de éxito
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};