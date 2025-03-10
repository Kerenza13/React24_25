import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useAuth();

    const fetchProducts = async (page = 1, category = '', search = '') => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `http://localhost:3000/api/products?page=${page}&category=${category}&search=${search}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (productData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if (!response.ok) throw new Error('Failed to create product');
            const newProduct = await response.json();
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();
            setProducts(prev =>
                prev.map(product =>
                    product._id === id ? updatedProduct : product
                )
            );
            return updatedProduct;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts(prev => prev.filter(product => product._id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        totalPages,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
};