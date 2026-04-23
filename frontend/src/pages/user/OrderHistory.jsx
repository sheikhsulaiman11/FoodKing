import { useState, useEffect } from 'react';
import { getMyOrders } from '../../services/orderServices';
import OrderCard from '../../components/order/OrderCard';
import Loader from '../../components/common/Loader';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getMyOrders();
                setOrders(res.data);
            } catch (err) {
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : orders.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-2xl mb-2">📦</p>
                        <p className="text-lg">No orders yet</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;