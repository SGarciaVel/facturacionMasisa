const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no encontrado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Almacena el id del usuario en la solicitud
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
