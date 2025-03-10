import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { token, isAuthenticated } = useAuth();

    // Estado para el status de cada pedido
    const [status, setStatus] = useState("preparing")

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch Orders");
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log("Error fetching Orders", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Cargando pedidos...
            </div>
        );
    }

    // Funcion para cambiar estado del pedido
    const updateOrderStatus = (status) => {

    }



    console.log(orders)
    return (
        <div>
            {isAuthenticated && (
                <>
                    <h2>Pedidos activos</h2>
                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className=" bg-white rounded-xl p-6 hover:shadow-sm"
                        >
                            <div className="relative group">
                                <div>Estado: {order.status}</div>
                                <div>Numero de mesa: {order.tableNumber}</div>
                                <div>Pedido #{order._id}</div>
                                <hr />
                                <div>
                                    {/* Productos */}
                                    <h2>Items</h2>

                                    {order.items.map((line) => (
                                        <div key={line._id}>
                                            x{line.quantity}: {line.menuItem.name} | {line.menuItem.price} €
                                        </div>
                                    ))}
                                </div>

                                <hr />
                                <div>Total: {order.total} €</div>
                                {order.status === "preparing" && (
                                    <button onClick={() => updateOrderStatus(order.status)}>👍Marcar como listo</button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}


        </div>
    )
}

export default Orders