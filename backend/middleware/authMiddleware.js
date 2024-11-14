const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Extrae el userId del token
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(403).json({ message: 'Token no válido o expirado' });
    }
};
