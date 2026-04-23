import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderServices';
import Loader from '../../components/common/Loader';

const OrderTracking = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderById(id);
                setOrder(res.data);
            } catch (err) {
                setError('Failed to load order');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <Loader />;

    if (error) return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <p className="text-red-500">{error}</p>
        </div>
    );

    const statuses = ['placed', 'accepted', 'preparing', 'outForDelivery', 'delivered'];

    const statusIndex = statuses.indexOf(order.status);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Order</h1>
                <p className="text-gray-500 mb-8">{order.restaurantId?.name}</p>

                {/* Status timeline */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Status</h2>
                    <div className="flex flex-col gap-4">
                        {statuses.map((status, index) => (
                            <div key={status} className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                    ${index <= statusIndex
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}>
                                    {index < statusIndex ? '✓' : index + 1}
                                </div>
                                <span className={`font-semibold capitalize
                                    ${index <= statusIndex ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {status === 'outForDelivery' ? 'Out for Delivery' : status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order items */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-gray-600 mb-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span>Rs {order.totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;