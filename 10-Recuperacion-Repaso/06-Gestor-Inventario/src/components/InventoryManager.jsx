import React from "react";
import { useInventory } from "../hooks/useInventory";
import { toast } from "react-hot-toast";

const InventoryManager = () => {
  const {
    inventory,
    selectedProduct,
    setSelectedProduct,
    quantity,
    setQuantity,
    movementType,
    setMovementType,
    handleStockUpdate,
    loading,
    error,
    movements,
  } = useInventory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    if (!quantity || parseInt(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    try {
      await handleStockUpdate();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stock Update Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Update Stock</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <select
                value={selectedProduct?.id || ""}
                onChange={(e) => {
                  const product = inventory.find(
                    (p) => p.id === parseInt(e.target.value)
                  );
                  setSelectedProduct(product);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a product</option>
                {inventory.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Current Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Movement Type
              </label>
              <select
                value={movementType}
                onChange={(e) => setMovementType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="entrada">Entry</option>
                <option value="salida">Exit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || parseInt(value) > 0) {
                    setQuantity(value);
                  }
                }}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Stock"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Inventory Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Inventory Overview</h2>
          <div className="space-y-4">
            {inventory.map((product) => (
              <div
                key={product.id}
                className={`p-4 rounded-lg shadow ${
                  product.stock < 10 ? "bg-red-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </p>
                  </div>
                  {product.stock < 10 && (
                    <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Movements */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Movements</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.map((movement) => {
                const product = inventory.find(
                  (p) => p.id === movement.productId
                );
                return (
                  <tr key={movement.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(movement.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.type === "entrada" ? "Entry" : "Exit"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          movement.type === "entrada"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {movement.type === "entrada" ? "+" : "-"}
                        {movement.quantity}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
