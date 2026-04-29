import { Menu } from '../model/menuModel.js';
import asyncHandler from '../utils/asyncHandler.js';


// get all menu items for a specific restaurant
export const getMenuByRestaurant = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
    const showAll = req.query.showAll === 'true';

    const filter = showAll
        ? { restaurantId }
        : { restaurantId, isAvailable: true };

    const menuItems = await Menu.find(filter);

    res.status(200).json({ success: true, data: menuItems });
});


// get single menu item
export const getMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    res.status(200).json({
        success: true,
        data: menuItem
    });
});

// add new menu item (restaurant admin only)
export const addMenuItem = asyncHandler(async (req, res) => {
    const { name, description, price, category, restaurantId } = req.body;

    if (!name || !description || !price || !category || !restaurantId) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const menuItem = await Menu.create(req.body);

    res.status(201).json({
        success: true,
        data: menuItem
    });
});

// update menu item (restaurant admin only)
export const updateMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }  // runValidators ensures enum values are checked
    );

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    res.status(200).json({
        success: true,
        data: menuItem
    });
});

// delete menu item (restaurant admin only)
export const deleteMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    res.status(200).json({
        success: true,
        message: 'Menu item deleted successfully'
    });
});

// toggle availability (restaurant admin only)
export const toggleAvailability = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    res.status(200).json({
        success: true,
        message: `Item marked as ${menuItem.isAvailable ? 'available' : 'unavailable'}`,
        data: menuItem
    });
});