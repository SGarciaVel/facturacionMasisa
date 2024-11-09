const fs = require('fs');
const csv = require('csv-parser');

exports.processCsv = (req, res) => {
    const results = [];
    if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó un archivo CSV.' });
    }
    const filePath = req.file.path; // Ruta temporal del archivo cargado

    // Lee y procesa el archivo CSV
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Elimina el archivo cargado
            fs.unlinkSync(filePath);

            // Enviar los datos procesados como respuesta
            res.status(200).json({
                message: 'Archivo CSV procesado exitosamente',
                data: results,
            });
        })
        .on('error', (error) => {
            console.error(error);
            res.status(500).json({ message: 'Error al procesar el archivo CSV' });
        });
};
