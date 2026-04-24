import api from './api.js';

export const getAllRestaurants = async () => {
    const response = await api.get('/restaurants');
    return response.data;
};

export const getMyRestaurant = async () => {
    const response = await api.get ('/restaurants/my-restaurant');
    return response.data;
}

export const createRestaurant = async (restaurantData) => {
    const response = await api.post('/restaurants', restaurantData);
    return response.data;
};

export const updateRestaurant = async (id, restaurantData) => {
    const response = await api.patch(`/restaurants/${id}`, restaurantData);
    return response.data;
};

export const deleteRestaurant = async (id) => {
    const response = await api.delete(`/restaurants/${id}`);
    return response.data;
};

export const approveRestaurant = async (id) => {
    const response = await api.patch(`/restaurants/${id}/approve`);
    return response.data;
};