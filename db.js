const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'taller_bdd',
    password: 'sgarcia1197',
    port: 5432,
});

module.exports = pool;