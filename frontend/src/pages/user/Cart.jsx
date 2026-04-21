import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Loader from '../../components/common/Loader';

const Cart = () => {
    const { cart, loading } = useCart();

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

                {cart.items.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-2xl mb-2">🛒</p>
                        <p className="text-lg">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart items */}
                        <div className="lg:col-span-2">
                            {cart.items.map((item) => (
                                <CartItem key={item.menuItemId} item={item} />
                            ))}
                        </div>

                        {/* Order summary */}
                        <div className="lg:col-span-1">
                            <CartSummary />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;