const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del encabezado de autorización

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token con JWT_SECRET
        req.userId = decoded.id; // Guardar el ID de usuario en la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token no válido' });
    }
};
