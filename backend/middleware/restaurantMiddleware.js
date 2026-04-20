import { Restaurant } from '../model/restaurantModel.js';
import asyncHandler from '../utils/asyncHandler.js';

export const isRestaurantOwner = asyncHandler(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }

    // check if the logged in user owns this restaurant
    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized, you do not own this restaurant');
    }

    next();
});