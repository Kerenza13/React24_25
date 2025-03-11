import { useDashboardStats } from '../hooks/useDashboardStats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const StatCard = ({ title, value, loading }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
        ) : (
            <>
                <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
            </>
        )}
    </div>
);

const Dashboard = () => {
    const {
        totalProducts,
        totalValue,
        lowStockProducts,
        productsByCategory,
        loading,
        error,
        setDateRange,
        exportToCSV
    } = useDashboardStats();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDateFilter = () => {
        setDateRange({
            start: startDate ? new Date(startDate) : null,
            end: endDate ? new Date(endDate) : null
        });
    };

    if (error) {
        return (
            <div className="text-red-500 text-center py-4">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                    Inventory Dashboard
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded p-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded p-2"
                        />
                        <button
                            onClick={handleDateFilter}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Filter
                        </button>
                    </div>
                    <button
                        onClick={exportToCSV}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    loading={loading}
                />
                <StatCard
                    title="Total Inventory Value"
                    value={`$${totalValue.toFixed(2)}`}
                    loading={loading}
                />
                <StatCard
                    title="Low Stock Items"
                    value={lowStockProducts.length}
                    loading={loading}
                />
                <StatCard
                    title="Categories"
                    value={productsByCategory.length}
                    loading={loading}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">Products by Category</h2>
                {loading ? (
                    <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
                ) : (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productsByCategory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4F46E5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {lowStockProducts.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {lowStockProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.stock}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;