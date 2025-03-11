import React from 'react';
import { Toaster } from 'react-hot-toast';
import { InventoryProvider } from './context/InventoryContext';
import InventoryManager from './components/InventoryManager';

const App = () => {
  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management System</h1>
          </div>
        </header>
        <main>
          <InventoryManager />
        </main>
      </div>
    </InventoryProvider>
  );
};

export default App;