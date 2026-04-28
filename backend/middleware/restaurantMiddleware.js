import { Restaurant } from '../model/restaurantModel.js';
import { Menu } from '../model/menuModel.js';
import { Order } from '../model/orderModel.js';
import asyncHandler from '../utils/asyncHandler.js';

export const isRestaurantOwner = asyncHandler(async (req, res, next) => {
    let restaurant;

    if (req.params.restaurantId) {
        // for routes like /orders/restaurant/:restaurantId
        restaurant = await Restaurant.findById(req.params.restaurantId);
    } else if (req.params.id) {
        // try menu item first, then order
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            restaurant = await Restaurant.findById(menuItem.restaurantId);
        } else {
            const order = await Order.findById(req.params.id);
            if (!order) {
                res.status(404);
                throw new Error('Resource not found');
            }
            restaurant = await Restaurant.findById(order.restaurantId);
        }
    }

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized, you do not own this restaurant');
    }

    next();
});