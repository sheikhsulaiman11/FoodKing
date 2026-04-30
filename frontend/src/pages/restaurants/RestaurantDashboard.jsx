import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ManageOrders from './ManageOrders';
import { getMyRestaurant } from '../../services/restaurantServices';

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getMyRestaurant();
                setRestaurant(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-orange-500 text-lg font-semibold animate-pulse">Loading dashboard...</div>
        </div>
    );

    if (!restaurant) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-gray-500 text-lg">No restaurant found</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">{restaurant.location} · {restaurant.deliveryTime} delivery</p>
                        </div>
                        {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            restaurant.isApproved
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {restaurant.isApproved ? '✓ Approved' : '⏳ Pending Approval'}
                        </span> */}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-6">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition ${
                                activeTab === 'orders'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            📦 Manage Orders
                        </button>
                        <button
                            onClick={() => navigate('/restaurant-dashboard/menu')}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition ${
                                activeTab === 'menu'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            🍽️ Manage Menu
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === 'orders' && <ManageOrders restaurantId={restaurant._id} />}
            </div>
        </div>
    );
};

export default RestaurantDashboard;
