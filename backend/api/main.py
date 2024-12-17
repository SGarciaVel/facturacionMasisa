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
CORS(app, resources={r"/*": {"origins": ["http://localhost:80", "http://146.83.198.35:1640"]}})

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
    print("Inicio del procesamiento de /process-excel")

    if 'file' not in request.files:
        print("No se envió ningún archivo")
        return jsonify({'error': 'No se envió ningún archivo'}), 400

    file = request.files['file']
    print(f"Archivo recibido: {file.filename}")

    if file.filename == '':
        print("Nombre del archivo vacío")
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(f"Guardando archivo en: {filepath}")

        try:
            file.save(filepath)
            print(f"Archivo guardado correctamente: {filepath}")

            graph_paths = process_excel(filepath)
            print(f"Gráficos generados en rutas: {graph_paths}")

            response = {
                'plan_graph': f"/static/{os.path.basename(graph_paths['plan_graph'])}",
                'service_graph': f"/static/{os.path.basename(graph_paths['service_graph'])}"
            }
            print(f"Respuesta generada: {response}")
            return jsonify(response), 200

        except Exception as e:
            print(f"Error al procesar el archivo: {str(e)}")
            return jsonify({'error': str(e)}), 500

    print("El archivo no es permitido o está vacío")
    return jsonify({'error': 'Archivo no permitido'}), 400


# Ruta para servir archivos estáticos desde la carpeta static
@app.route('/static/<path:filename>')
def serve_static_file(filename):
    return send_from_directory(app.config['STATIC_FOLDER'], filename)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
