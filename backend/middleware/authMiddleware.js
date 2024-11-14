const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Verifica si existe y extrae el token

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Añade el userId al objeto request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};
