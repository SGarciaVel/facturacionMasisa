require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const csvRoutes = require('./Routes/csvRoutes');

const app = express();
const PORT = 3000;

// Middleware
// Configurar CORS
// Declarar los orígenes permitidos
const allowedOrigins = ['http://localhost:3000', 'http://146.83.198.35:1640'];

// Configuración de CORS
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
// Rutas de CSV
app.use('/api/csv', csvRoutes);


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
