const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
};

exports.getUserByEmail = (email) => {
  return pool.query('SELECT * FROM users WHERE email = $1', [email]);
};
