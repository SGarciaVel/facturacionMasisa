from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
from utils import process_excel

# Configuración inicial
UPLOAD_FOLDER = 'uploads'
STATIC_FOLDER = 'static'  # Carpeta donde se guardan los gráficos
ALLOWED_EXTENSIONS = {'xls', 'xlsx'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['STATIC_FOLDER'] = STATIC_FOLDER

# Permitir CORS para el frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Crear carpetas si no existen
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(STATIC_FOLDER):
    os.makedirs(STATIC_FOLDER)

# Validar tipo de archivo
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Endpoint para procesar archivos Excel
@app.route('/process-excel', methods=['POST'])
def process_excel_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No se envió ningún archivo'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400

    if file and allowed_file(file.filename):
        # Guardar el archivo en la carpeta uploads
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Procesar el archivo Excel
        try:
            graph_paths = process_excel(filepath)  # Genera los gráficos

            # Devolver URLs accesibles de los gráficos
            response = {
                'plan_graph': f"/static/{os.path.basename(graph_paths['plan_graph'])}",
                'service_graph': f"/static/{os.path.basename(graph_paths['service_graph'])}"
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Archivo no permitido'}), 400

# Ruta para servir archivos estáticos desde la carpeta static
@app.route('/static/<path:filename>')
def serve_static_file(filename):
    return send_from_directory(app.config['STATIC_FOLDER'], filename)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
