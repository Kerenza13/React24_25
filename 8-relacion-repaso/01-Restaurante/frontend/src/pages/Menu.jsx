import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL;

const Menu = () => {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated } = useAuth();
    const { cart, addToCart, getTotal } = useCart();


    useEffect(() => {
        fetchMenus();
    }, []);

    console.log(getTotal)

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/menu`);
            if (!response.ok) {
                throw new Error("Failed to fetch menus");
            }
            const data = await response.json();
            setMenus(data);
        } catch (error) {
            console.log("Error fetchingMenus", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Cargando menus...
            </div>
        );
    }


    // Añadir plato al carrito
    const handleClick = (menu) => {
        // { items: [{ menuItem, quantity }], total, tableNumber, status }
        addToCart(menu);

        console.log(`plato ${menu._id} añadido al carrito`)

    }

    return (
        <div>
            <h2>Nuestro menú</h2>
            {menus.map((menu) => (

                <div
                    key={menu._id}
                    className=" bg-white rounded-xl p-6 hover:shadow-sm"
                >
                    <div className="relative group">
                        <img
                            className="mx-auto w-16"
                            src={menu.image}
                            alt={menu.name}
                        />
                        <h2 className="text-xl font-bold text-center mt-4">
                            {menu.name}
                        </h2>
                        <div>{menu.description}</div>
                        <div>{menu.price}</div>
                        <div>{menu.category}</div>

                        {isAuthenticated && (
                            <button onClick={() => handleClick(menu)}>➕Añadir plato al carrito</button>
                        )}

                    </div>
                </div>
            ))}

        </div>
    )
}

export default Menu