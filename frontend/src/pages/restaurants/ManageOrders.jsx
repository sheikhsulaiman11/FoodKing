import React, { useEffect, useState } from 'react';
import { getRestaurantOrders, updateOrderStatus } from "../../services/orderServices";

const ManageOrders = ({ restaurantId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const data = await getRestaurantOrders(restaurantId);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [restaurantId]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders(); // refresh after update
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div>
            <h2>Manage Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orders.map(order => (
                    <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Address:</strong> {order.deliveryAddress}</p>

                        <select
                            value={order.status}
                            onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                            }
                        >
                            <option value="placed">Placed</option>
                            <option value="accepted">Accepted</option>
                            <option value="preparing">Preparing</option>
                            <option value="outForDelivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageOrders;