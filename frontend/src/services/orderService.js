import api from './api';

export const placeOrder = async (deliveryAddress) => {
    const response = await api.post('/orders', { deliveryAddress });
    return response.data;
};

export const getMyOrders = async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const getRestaurantOrders = async (restaurantId) => {
    const response = await api.get(`/orders/restaurant/${restaurantId}`);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
};

export const getAllOrders = async () => {
    const response = await api.get('/orders/all');
    return response.data;
};