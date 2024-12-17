from flask import Flask, request, jsonify, send_file
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
from utils import process_excel

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xls', 'xlsx'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Permitir CORS para todas las rutas y dominios específicos
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

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
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)  # Guardar el archivo

        # Procesar el archivo y generar gráficos
        try:
            graph_paths = process_excel(filepath)  # Procesar y obtener ruta
            return send_file(graph_paths['plan_graph'], mimetype='image/png')  # Devuelve la imagen generada
        except Exception as e:
            return jsonify({'error': str(e)}), 500



    return jsonify({
    'plan_graph': f"/uploads/{os.path.basename(graph_paths['plan_graph'])}",
    'monto_graph': f"/uploads/{os.path.basename(graph_paths['monto_graph'])}"
}), 200


if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
