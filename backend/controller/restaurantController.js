import { Restaurant } from '../model/restaurantModel.js';
import asyncHandler from '../utils/asyncHandler.js';

// get all restaurants
export const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(200).json({
        success: true,
        data: restaurants
    });
});

// create new restaurant
export const createRestaurant = asyncHandler(async (req, res) => {
    const { name, location } = req.body;

    if (!name || !location) {
        res.status(400);
        throw new Error('Name and location are required');
    }

    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
        success: true,
        data: restaurant
    });
});

// update restaurant
export const updateRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }        
    );

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }

    res.status(200).json({
        success: true,
        data: restaurant
    });
});

// delete restaurant
export const deleteRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }

    res.status(200).json({
        success: true,
        message: 'Restaurant deleted successfully'
    });
});

// approve restaurant (super admin only)
export const approveRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
    );

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }

    res.status(200).json({
        success: true,
        message: 'Restaurant approved successfully',
        data: restaurant
    });
});