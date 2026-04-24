import React, { useEffect, useState } from 'react';
import ManageOrders from './ManageOrders';
import { getMyRestaurant } from '../../services/restaurantServices';

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading dashboard...</p>;
    if (!restaurant) return <p>No restaurant found</p>;

    return (
        <div>
            <h1>{restaurant.name} Dashboard</h1>

            <h3>Status: {restaurant.isApproved ? 'Approved' : 'Pending Approval'}</h3>

            <ManageOrders restaurantId={restaurant._id} />
        </div>
    );
};

export default RestaurantDashboard;