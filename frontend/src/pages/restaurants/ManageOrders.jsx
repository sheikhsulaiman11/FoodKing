import { useEffect, useState } from 'react';
import { getRestaurantOrders, updateOrderStatus } from '../../services/orderServices';

const STATUS_COLORS = {
    placed:        { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Placed' },
    accepted:      { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Accepted' },
    preparing:     { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Preparing' },
    outForDelivery:{ bg: 'bg-orange-100', text: 'text-orange-700', label: 'Out for Delivery' },
    delivered:     { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Delivered' },
};

const ManageOrders = ({ restaurantId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchOrders = async () => {
        try {
            const data = await getRestaurantOrders(restaurantId);
            setOrders(data.data);
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
        setUpdatingId(orderId);
        try {
            await updateOrderStatus(orderId, newStatus);
            // update locally without full refetch
            setOrders(prev =>
                prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
            );
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) return (
        <div className="text-center py-20 text-orange-500 font-semibold animate-pulse">
            Loading orders...
        </div>
    );

    if (orders.length === 0) return (
        <div className="text-center py-20">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 text-lg">No orders yet</p>
        </div>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Orders <span className="text-orange-500">({orders.length})</span></h2>
                <button
                    onClick={fetchOrders}
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
                >
                    ↻ Refresh
                </button>
            </div>

            <div className="space-y-4">
                {orders.map(order => {
                    const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.placed;
                    return (
                        <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-start justify-between gap-4">
                                {/* Left: order info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-400 font-mono truncate">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                                            {statusStyle.label}
                                        </span>
                                    </div>

                                    {/* Customer */}
                                    {order.userId && (
                                        <p className="text-sm text-gray-600 mb-1">
                                            👤 {order.userId.firstName} {order.userId.lastName}
                                        </p>
                                    )}

                                    {/* Items */}
                                    <div className="text-sm text-gray-500 mb-2">
                                        {order.items.map((item, i) => (
                                            <span key={i}>
                                                {item.name} ×{item.quantity}{i < order.items.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Address */}
                                    <p className="text-sm text-gray-500">📍 {order.deliveryAddress}</p>
                                </div>

                                {/* Right: price + status update */}
                                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                    <p className="text-lg font-bold text-gray-800">Rs {order.totalPrice}</p>
                                    <select
                                        value={order.status}
                                        disabled={updatingId === order._id}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-orange-400 cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="placed">Placed</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="outForDelivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageOrders;
