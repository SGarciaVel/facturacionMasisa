import { Outlet } from 'react-router-dom';  // Para renderizar los hijos del enrutador

function Root() {
  return (
    <div>
      <header>
        <h1>Bienvenido a nuestra aplicación</h1>
      </header>
      <main>
        <Outlet />  {/* Aquí se inyectarán los componentes hijos */}
      </main>
    </div>
  );
}

export default Root;
