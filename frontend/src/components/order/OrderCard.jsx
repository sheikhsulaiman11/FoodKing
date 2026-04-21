import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    const statusColors = {
        placed: 'bg-yellow-100 text-yellow-600',
        accepted: 'bg-blue-100 text-blue-600',
        preparing: 'bg-orange-100 text-orange-600',
        outForDelivery: 'bg-purple-100 text-purple-600',
        delivered: 'bg-green-100 text-green-600',
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm mb-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="font-bold text-gray-800">{order.restaurantId?.name}</h3>
                    <p className="text-gray-500 text-sm">{order.restaurantId?.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                </span>
            </div>

            {/* Items */}
            <div className="border-t border-gray-100 pt-3 mb-3">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs {item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-800">Total: Rs {order.totalPrice}</span>
                <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
                >
                    Track Order
                </button>
            </div>
        </div>
    );
};

export default OrderCard;