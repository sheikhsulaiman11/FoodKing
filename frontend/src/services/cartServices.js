import api from './api.js';

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (menuItemId, quantity) => {
    const response = await api.post('/cart/add', { menuItemId, quantity });
    return response.data;
};

export const updateCart = async (menuItemId, quantity) => {
    const response = await api.patch('/cart/update', { menuItemId, quantity });
    return response.data;
};

export const removeFromCart = async (menuItemId) => {
    const response = await api.delete(`/cart/remove/${menuItemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
};