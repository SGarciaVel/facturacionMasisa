import pandas as pd
import matplotlib.pyplot as plt
import os

def process_excel(filepath):
    # Crear carpeta static si no existe
    static_dir = "static"
    os.makedirs(static_dir, exist_ok=True)

    # Leer el archivo Excel
    df = pd.read_excel(filepath)

    # Columnas clave
    required_columns = ['Cliente', 'Plan Tarifario', 'Monto', 'N° de Servicio', 'Grupo', 'Producto']
    for column in required_columns:
        if column not in df.columns:
            raise ValueError(f'El archivo Excel no contiene la columna "{column}".')

    # Gráfico de barras para "Plan Tarifario"
    plt.figure(figsize=(10, 6))
    df['Plan Tarifario'].value_counts().plot(kind='bar', color='skyblue')
    plt.title('Distribución de Planes Tarifarios')
    plt.xlabel('Plan Tarifario')
    plt.ylabel('Cantidad de Clientes')
    plan_graph_path = os.path.join(static_dir, 'planes.png')
    plt.savefig(plan_graph_path)
    plt.close()

    # Gráfico de pastel por "Grupo" y "Producto"
    group_product_df = df.groupby(['Grupo', 'Producto'])['N° de Servicio'].count()
    plt.figure(figsize=(8, 8))
    group_product_df.plot(kind='pie', autopct='%1.1f%%', startangle=140, colormap='viridis')
    plt.title('Distribución de N° de Servicio por Grupo y Producto')
    service_graph_path = os.path.join(static_dir, 'servicios.png')
    plt.savefig(service_graph_path)
    plt.close()

    # Devolver URLs accesibles
    return {
        'plan_graph': f"/static/planes.png",
        'service_graph': f"/static/servicios.png"
    }
