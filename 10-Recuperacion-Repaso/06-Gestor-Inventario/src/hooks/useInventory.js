import { useState, useCallback } from 'react';
import { useInventoryContext } from '../context/InventoryContext';

export const useInventory = () => {
  const { inventory, updateStock, loading, error, movements } = useInventoryContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [movementType, setMovementType] = useState('entrada');

  const handleStockUpdate = useCallback(async () => {
    if (!selectedProduct || !quantity) return;
    
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new Error('Quantity must be a positive number');
    }

    await updateStock(selectedProduct.id, parsedQuantity, movementType);
    
    // Reset form
    setQuantity('');
    setSelectedProduct(null);
  }, [selectedProduct, quantity, movementType, updateStock]);

  const getLowStockProducts = useCallback(() => {
    return inventory.filter(product => product.stock < 10);
  }, [inventory]);

  const getMonthlyMovements = useCallback(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return movements.filter(movement => {
      const movementDate = new Date(movement.date);
      return movementDate >= startOfMonth;
    });
  }, [movements]);

  return {
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
    getLowStockProducts,
    getMonthlyMovements
  };
};