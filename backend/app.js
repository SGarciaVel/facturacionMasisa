const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas
const authMiddleware = require('./middleware/authMiddleware');

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Rutas
app.use('/api/users', userRoutes); // Aquí se manejarán las rutas de usuario

// Rutas protegidas
app.get('/api/users/me', authMiddleware.verifyToken, (req, res) => {
    res.status(200).json({ message: `Usuario autenticado con ID: ${req.userId}` });
});

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de usuarios');
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
