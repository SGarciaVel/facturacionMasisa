const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No se proporcionó un archivo." });
        }

        // Procesa archivo CSV aquí, como lectura etc
        // Placeholder para una función de procesamiento

        res.status(200).json({ message: "Archivo cargado exitosamente." });
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
};
