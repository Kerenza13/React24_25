import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const InventoryContext = createContext();

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return context;
};

// Initial sample inventory data
const initialInventory = [
  { id: 1, name: 'Laptop', stock: 15 },
  { id: 2, name: 'Smartphone', stock: 25 },
  { id: 3, name: 'Tablet', stock: 8 },
  { id: 4, name: 'Headphones', stock: 30 },
  { id: 5, name: 'Monitor', stock: 12 }
];

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStock = async (productId, quantity, type) => {
    try {
      setLoading(true);
      setError(null);

      const product = inventory.find(item => item.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const newStock = type === 'entrada' 
        ? product.stock + quantity
        : product.stock - quantity;

      if (newStock < 0) {
        throw new Error('Stock cannot be negative');
      }

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedInventory = inventory.map(item =>
        item.id === productId
          ? { ...item, stock: newStock }
          : item
      );

      const movement = {
        id: Date.now(),
        productId,
        type,
        quantity,
        date: new Date().toISOString(),
        previousStock: product.stock,
        newStock
      };

      setInventory(updatedInventory);
      setMovements(prev => [movement, ...prev]);

      toast.success(`Stock ${type === 'entrada' ? 'increased' : 'decreased'} successfully`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    inventory,
    setInventory,
    movements,
    loading,
    error,
    updateStock
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};