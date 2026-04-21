import { useState, useEffect } from 'react';
import { getAllRestaurants } from '../../services/restaurantServices';
import RestaurantGrid from '../../components/restaurant/RestaurantGrid';
import Loader from '../../components/common/Loader';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await getAllRestaurants();
                setRestaurants(res.data);
            } catch (err) {
                setError('Failed to load restaurants');
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero */}
            <div className="bg-orange-500 text-white py-16 px-6 text-center">
                <h1 className="text-4xl font-bold mb-3">Order Food You Love</h1>
                <p className="text-orange-100 text-lg">Fast delivery from the best restaurants near you</p>
            </div>

            {/* Restaurants */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Restaurants</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <RestaurantGrid restaurants={restaurants} />
                )}
            </div>
        </div>
    );
};

export default Home;