import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Gestión</h1>
        <p className="text-gray-600">Gestione los pedidos del restaurante</p>

        {/* Mostrar la lista de orders */}
        <div>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;

