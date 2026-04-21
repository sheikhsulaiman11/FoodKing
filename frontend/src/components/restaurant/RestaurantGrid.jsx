import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants }) => {
    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No restaurants available
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantGrid;