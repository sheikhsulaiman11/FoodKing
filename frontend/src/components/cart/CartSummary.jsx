import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>Rs {cart.totalPrice}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2">
                <span>Delivery Fee</span>
                <span>Rs 100</span>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-between font-bold text-gray-800 text-lg mb-6">
                <span>Total</span>
                <span>Rs {cart.totalPrice + 100}</span>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
                Proceed to Checkout
            </button>

            <button
                onClick={clearCart}
                className="w-full mt-3 border border-red-400 text-red-400 py-3 rounded-lg font-semibold hover:bg-red-50"
            >
                Clear Cart
            </button>
        </div>
    );
};

export default CartSummary;