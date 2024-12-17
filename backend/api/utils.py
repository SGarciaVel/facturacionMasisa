import pandas as pd
import matplotlib.pyplot as plt
import os

def process_excel(filepath):
    # Leer el archivo Excel
    df = pd.read_excel(filepath)

    # Columnas clave
    required_columns = ['Cliente', 'Plan Tarifario', 'Monto']
    for column in required_columns:
        if column not in df.columns:
            raise ValueError(f'El archivo Excel no contiene la columna "{column}".')

    # Gráfico de barras para "Plan Tarifario" (conteo por plan)
    plt.figure(figsize=(10, 6))
    df['Plan Tarifario'].value_counts().plot(kind='bar', color='skyblue')
    plt.title('Distribución de Planes Tarifarios')
    plt.xlabel('Plan Tarifario')
    plt.ylabel('Cantidad de Clientes')
    plan_graph_path = os.path.splitext(filepath)[0] + '_planes.png'
    plt.savefig(plan_graph_path)
    plt.close()

    # Gráfico de pastel para "Monto" (distribución de montos por cliente)
    top_clients = df.groupby('Cliente')['Monto'].sum().sort_values(ascending=False).head(5)
    plt.figure(figsize=(8, 8))
    top_clients.plot(kind='pie', autopct='%1.1f%%', startangle=140, colormap='viridis')
    plt.title('Top 5 Clientes por Monto')
    monto_graph_path = os.path.splitext(filepath)[0] + '_montos.png'
    plt.savefig(monto_graph_path)
    plt.close()

    # Devolver las rutas de los gráficos generados
    return {'plan_graph': plan_graph_path, 'monto_graph': monto_graph_path}