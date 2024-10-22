// Importar las dependencias necesarias
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de tener este archivo
const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Rutas
app.use('/api/users', userRoutes); // Aquí se manejarán las rutas de usuario

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
