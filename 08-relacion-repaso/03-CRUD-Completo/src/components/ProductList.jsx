import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductForm from './ProductForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductList = () => {
    const { products, loading, error, totalPages, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });

    // Load products on mount and when filters change
    useState(() => {
        fetchProducts(currentPage, selectedCategory, searchTerm);
    }, [currentPage, selectedCategory, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleCreateProduct = async (productData) => {
        await createProduct(productData);
        setIsFormOpen(false);
        fetchProducts(currentPage, selectedCategory, searchTerm);
    };

    const handleUpdateProduct = async (productData) => {
        await updateProduct(editingProduct._id, productData);
        setEditingProduct(null);
        fetchProducts(currentPage, selectedCategory, searchTerm);
    };

    const handleDeleteConfirm = async () => {
        if (deleteModal.product) {
            await deleteProduct(deleteModal.product._id);
            setDeleteModal({ isOpen: false, product: null });
            fetchProducts(currentPage, selectedCategory, searchTerm);
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">All Categories</option>
                    {/* Add unique categories from products */}
                    {[...new Set(products.map(p => p.category))].map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-900">${product.price}</span>
                            <span className="text-sm text-gray-500">{product.category}</span>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setDeleteModal({ isOpen: true, product })}
                                className="text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md ${currentPage === page
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {/* Product Form Modal */}
            {(isFormOpen || editingProduct) && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <ProductForm
                            initialData={editingProduct}
                            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, product: null })}
                onConfirm={handleDeleteConfirm}
                productName={deleteModal.product?.name}
            />
        </div>
    );
};

export default ProductList;