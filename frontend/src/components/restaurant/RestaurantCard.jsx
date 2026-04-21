import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img
                src={restaurant.image || 'https://via.placeholder.com/300x200?text=Restaurant'}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg">{restaurant.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{restaurant.location}</p>
                <button
                    onClick={() => navigate(`/restaurants/${restaurant._id}`)}
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
                >
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default RestaurantCard;