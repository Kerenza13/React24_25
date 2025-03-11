import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const RootLayout = () => {

  const { user, token, isAuthenticated, login, logOut } = useAuth();
  const { cart, getTotalItems } = useCart();



  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <nav className="bg-amber-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              🍽️ RestaurantAPP
              <span className="text-gray-600 font-medium">
                <Link to="/">Examen DWEC 2025 Bilingüe</Link>
              </span>
            </div>

            {/* div para opciones de sesion */}
            <div>
              {!isAuthenticated ? (
                <>
                  {/* Iniciar sesion */}
                  <Link to="login">Iniciar sesion</Link>
                </>
              ) : (
                <>
                  {/* Ver pedidos */}
                  <Link to="dashboard">Ver Pedidos</Link>

                  {getTotalItems === 0 ? (
                    <> No hay productos en el carrito</>
                  ) : (
                    <Link to="dashboard/pedido">Finalizar pedido ({getTotalItems})</Link>
                  )}

                  {/* Cerrar sesion */}
                  <button onClick={logOut}>Cerrar sesion</button>

                </>
              )}
            </div>

            <div>

            </div>
          </div>
        </div>
      </nav>

      <main
        className="flex-grow py-6"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/white-marble-texture-background_23-2147749546.jpg?1024')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      >
        <Outlet />

      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
