import bcrypt from 'bcryptjs';
import { User } from '../model/userModel.js';
import { createJWT } from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Restaurant } from '../model/restaurantModel.js';

// signup user
export const signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role, restaurantData } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
        res.status(400);
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword
    });

    // create restaurant document if role is restaurant_owner
    let restaurant = null;
    if (role === 'restaurant_owner') {
        if (!restaurantData?.name || !restaurantData?.location || !restaurantData?.deliveryTime) {
            res.status(400);
            throw new Error('Restaurant name, location and delivery time are required');
        }
        restaurant = await Restaurant.create({
            name:         restaurantData.name,
            location:     restaurantData.location,
            deliveryTime: restaurantData.deliveryTime,
            rating:       0,
            owner:        user._id
        });
    }

    const data = {
        username:     user.firstName,
        userId:       user._id,
        role:         user.role,
        restaurantId: restaurant?._id || null
    };
    const token = createJWT(data, res);

    res.status(201).json({
        success: true,
        token,
        user: {
            username:     user.firstName,
            role:         user.role,
            restaurantId: restaurant?._id || null
        }
    });
});

// login user
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('Email not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Wrong password');
    }

    // fetch restaurant if owner
    let restaurant = null;
    if (user.role === 'restaurant_owner') {
        restaurant = await Restaurant.findOne({ owner: user._id });
    }

    const data = {
        username:     user.firstName,
        userId:       user._id,
        role:         user.role,
        restaurantId: restaurant?._id || null
    };
    const token = createJWT(data, res);

    res.status(200).json({
        success: true,
        token,
        user: {
            username:     user.firstName,
            role:         user.role,
            restaurantId: restaurant?._id || null
        }
    });
});

// logout user
export const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

// get current logged in user
export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // fetch restaurant if owner
    let restaurant = null;
    if (user.role === 'restaurant_owner') {
        restaurant = await Restaurant.findOne({ owner: user._id });
    }

    res.status(200).json({
        success: true,
        data: {
            ...user.toObject(),
            restaurantId: restaurant?._id || null
        }
    });
});