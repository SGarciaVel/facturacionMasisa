require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const csvRoutes = require('./Routes/csvRoutes'); // Importa las rutas de CSV

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

// Middleware
// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173',  // Permitir solicitudes desde el frontend
}));

app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); // Rutas de usuario
// Rutas de CSV
app.use('/api/csv', csvRoutes); // Ruta de CSV


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
