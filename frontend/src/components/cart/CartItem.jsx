import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-3">
            {/* Item details */}
            <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-orange-500 font-bold">Rs {item.price}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                    className="w-8 h-8 bg-orange-100 text-orange-500 rounded-full font-bold hover:bg-orange-200"
                >
                    -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                    className="w-8 h-8 bg-orange-100 text-orange-500 rounded-full font-bold hover:bg-orange-200"
                >
                    +
                </button>
            </div>

            {/* Subtotal + remove */}
            <div className="text-right">
                <p className="font-bold text-gray-800">Rs {item.price * item.quantity}</p>
                <button
                    onClick={() => removeFromCart(item.menuItemId)}
                    className="text-red-400 text-sm hover:text-red-600 mt-1"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;