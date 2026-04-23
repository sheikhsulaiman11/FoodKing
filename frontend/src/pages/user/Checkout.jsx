import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { placeOrder } from '../../services/orderServices';

const Checkout = () => {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!deliveryAddress) {
            setError('Please enter a delivery address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await placeOrder(deliveryAddress);
            clearCart();
            navigate('/order-success');
        } catch (err) {
            setError('Failed to place order, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                {/* Order items */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                    {cart.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-gray-600 mb-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span>Rs {cart.totalPrice + 100}</span>
                    </div>
                </div>

                {/* Delivery address */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                    {error && (
                        <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>
                    )}
                    <textarea
                        placeholder="Enter your full delivery address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 resize-none"
                    />
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 disabled:opacity-50"
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;