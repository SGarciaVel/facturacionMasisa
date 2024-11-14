const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const moment = require('moment'); // Asegúrate de que esta línea solo aparezca una vez.


// Función para generar un JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const generateCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.registerUser = async (req, res) => {
    const { nombre, apellido, email, password, pais, fechaNacimiento } = req.body;

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();
        const expirationTime = moment().add(1, 'minute').toISOString(); // Expiración en 1 minuto

        await pool.query(
            'INSERT INTO users (nombre, apellido, email, password, pais, fecha_nacimiento, verification_code, verification_code_expiration, is_verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [nombre, apellido, email, hashedPassword, pais, fechaNacimiento, verificationCode, expirationTime, false]
        );

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Código de Verificación',
            text: `Tu código de verificación es: ${verificationCode}`,
        });

        res.status(200).json({ message: 'Registro exitoso. Verifica tu correo para completar el proceso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
};


exports.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE verification_code = $1', [code]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Código de verificación incorrecto o expirado.' });
        }

        const user = userResult.rows[0];
        const currentTime = moment();

        if (currentTime.isAfter(user.verification_code_expiration)) {
            return res.status(400).json({ message: 'El código de verificación ha expirado. Solicita uno nuevo.' });
        }

        await pool.query('UPDATE users SET is_verified = true WHERE id = $1', [user.id]);

        res.status(200).json({ message: 'Verificación exitosa. Ya puedes iniciar sesión.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar el código.' });
    }
};




exports.resendCode = async (req, res) => {
    const { email } = req.body;
  
    try {
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (userResult.rows.length === 0) {
        return res.status(400).json({ message: 'Correo no registrado.' });
      }
  
      const user = userResult.rows[0];
      const newCode = generateCode();
      
      await pool.query('UPDATE users SET verification_code = $1 WHERE email = $2', [newCode, email]);
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Nuevo Código de Verificación',
        text: `Tu nuevo código de verificación es: ${newCode}`,
      });
  
      res.status(200).json({ message: 'Código reenviado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al reenviar el código.' });
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

        // Si todo es correcto, responde con el token
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token, 
            user: { id: user.id, email: user.email } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const user = await pool.query('SELECT id, nombre, apellido, email FROM users WHERE id = $1', [req.userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos del usuario' });
    }
};
