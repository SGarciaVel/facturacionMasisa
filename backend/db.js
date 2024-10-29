const { Pool } = require('pg');

const pool = new Pool({
    user: 'sgarcia',        // Cambia por tu usuario de PostgreSQL
    host: 'localhost',
    database: 'sgarcia_bd', // Cambia por tu base de datos
    password: 'sebastian2024',     // Cambia por tu contraseña
    port: 5432,                     // Puerto por defecto de PostgreSQL
});

module.exports = pool;
