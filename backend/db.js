const { Pool } = require('pg');

const pool = new Pool({
    user: 'sgarcia',
    host: 'pgsqltrans.face.ubiobio.cl',
    database: 'sgarcia_db', 
    password: 'sebastian2024', 
    port: 5432,
});

module.exports = pool;
