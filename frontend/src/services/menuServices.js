import api from './api.js';

export const getMenuByRestaurant = async (restaurantId) => {
    const response = await api.get(`/menu/restaurants/${restaurantId}`);
    return response.data;
};

export const getMenuItem = async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
};

export const addMenuItem = async (menuData) => {
    const response = await api.post('/menu', menuData);
    return response.data;
};

export const updateMenuItem = async (id, menuData) => {
    const response = await api.patch(`/menu/${id}`, menuData);
    return response.data;
};

export const deleteMenuItem = async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
};

export const toggleAvailability = async (id) => {
    const response = await api.patch(`/menu/${id}/toggle`);
    return response.data;
};