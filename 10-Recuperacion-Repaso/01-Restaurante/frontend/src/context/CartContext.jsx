import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    // Estado para el total
    const [total, setTotal] = useState(0)

    // Effect para actualizar el localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        getTotal()
    }, [cart])


    const addToCart = (product) => {
        // Añado un campo al carrito (idCart)
        product.idCart = Date.now();
        setCart((preCart) => [...preCart, product]);
    };

    const removeFromCart = (idCart) => {
        setCart((preCart) =>
            preCart.filter((c) => c?.idCart !== idCart)
        );

    };

    const clearCart = () => {
        setCart([]);
    }

    const getTotal = () => {
        // Recorro cart y sumo el precio total
        const totalPrice = cart.reduce((acc, product) => {
            return acc + product.price
        }, 0);
        setTotal(totalPrice);
    }

    const getTotalItems = cart.length;


    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, total, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe estar dentro del proveedor CartProvider");
    }
    return context;
};
