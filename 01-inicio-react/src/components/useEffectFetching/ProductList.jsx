import { useState, useEffect } from "react"

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5173/src/data/db.json')
            if (!response.ok) throw new Error("ERROR");
            setProducts(await response.json());

        }
        catch (error) {
            console.error('Fetch error:', error)
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-5 text-center">
                Lista de productos
            </h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="mb-4">
                        <strong>{product.name}</strong> - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList