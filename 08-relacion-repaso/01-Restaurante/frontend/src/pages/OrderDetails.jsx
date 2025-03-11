import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

const OrderDetails = () => {

    const { cart, total, removeFromCart, getTotalItems, clearCart } = useCart();

    // Estado para almacenar informacion adicional sobre el carrito
    const [formData, setFormData] = useState({
        tableNumber: 0,
    });
    const navigate = useNavigate();

    // Almacenar numero de mesa
    const [tableNumber, setTableNumber] = useState(0)





    const handleDelete = (idCart) => {
        removeFromCart(idCart);
        console.log(`Borrado ${idCart}`)
    }

    const handleCancel = () => {
        clearCart();
        navigate("/dashboard")
    }




    return (
        <>
            <h1>Resumen del pedido</h1>
            {cart.map((product) => (

                <div
                    key={product.idCart}
                    className=" bg-white rounded-xl p-6 hover:shadow-sm"
                >
                    <img
                        className=" w-16"
                        src={product.image}
                        alt={product.name}
                    />
                    <h2 className="">
                        {product.name}
                    </h2>
                    {product.price}
                    <button onClick={() => handleDelete(product.idCart)}>❌</button>
                </div>
            ))
            }
            <span>Total ({getTotalItems}): {total} €</span>

            <hr />

            <form
                className="p-4 bg-gray-200 rounded-lg shadow-md"
            // onSubmit={ }
            >
                <label>Número de mesa: </label>
                <input
                    type="number"
                    // value={tableNumber}
                    // onChange={ }
                    placeholder="Número de mesa"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="checkbox"
                    id="recogidaRestaurante"
                    name="recogidaRestaurante" />
                <label htmlFor="recogidaRestaurante">Recogida en restaurante</label>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Confirmar pedido
                    </button>
                </div>

            </form>

        </ >
    )
}

export default OrderDetails