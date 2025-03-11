import { useState, useEffect } from 'react';

export const useDashboardStats = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        lowStockProducts: [],
        productsByCategory: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const fetchStats = async () => {
        try {
            setLoading(true);
            // Simulated API call - replace with actual endpoint
            const response = await fetch('http://localhost:3000/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();

            // Calculate statistics
            const totalProducts = products.length;
            const totalValue = products.reduce((sum, product) => 
                sum + (product.price * product.stock), 0
            );
            const lowStockProducts = products.filter(product => product.stock < 10);

            // Group products by category
            const categoryMap = products.reduce((acc, product) => {
                const category = product.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            const productsByCategory = Object.entries(categoryMap).map(([name, count]) => ({
                name,
                count
            }));

            setStats({
                totalProducts,
                totalValue,
                lowStockProducts,
                productsByCategory
            });
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and setup interval
    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, [dateRange]); // Re-fetch when date range changes

    const exportToCSV = () => {
        const headers = ['Category', 'Count'];
        const csvData = [
            headers.join(','),
            ...stats.productsByCategory.map(item => 
                [item.name, item.count].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory-stats.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return {
        ...stats,
        loading,
        error,
        setDateRange,
        exportToCSV
    };
};