import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const OrderDetails = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [isForTakeout, setIsForTakeout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          tableNumber: isForTakeout ? null : tableNumber,
          isForTakeout,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      clearCart();
      navigate("/dashboard/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Detalles del Pedido</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Items en el Carrito</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No hay items en el carrito</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="text-xl font-bold">
                  Total: ${getTotal().toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isForTakeout}
              onChange={(e) => setIsForTakeout(e.target.checked)}
              className="form-checkbox"
            />
            <span>Para llevar</span>
          </label>

          {!isForTakeout && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Número de Mesa
              </label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required={!isForTakeout}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || cartItems.length === 0}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Procesando..." : "Confirmar Pedido"}
        </button>
      </form>
    </div>
  );
};

export default OrderDetails;