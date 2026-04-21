import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
                src={item.image || 'https://via.placeholder.com/300x200?text=Food'}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-orange-500 font-bold text-lg">Rs {item.price}</span>
                    <button
                        onClick={() => addToCart(item._id, 1)}
                        disabled={!item.isAvailable}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;