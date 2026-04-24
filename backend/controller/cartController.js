import { Cart } from '../model/cartModel.js';
import { Menu } from '../model/menuModel.js';
import asyncHandler from '../utils/asyncHandler.js';

// get current user's cart
export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id })
        .populate('items.menuItemId'); // brings full food item details

    if (!cart) {
        return res.status(200).json({
            success: true,
            data: { items: [], totalPrice: 0 }
        });
    }

    res.status(200).json({
        success: true,
        data: cart
    });
});

// add item to cart
export const addToCart = asyncHandler(async (req, res) => {
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || quantity === undefined || quantity <= 0) {
    res.status(400);
    res.redirect('/cart');
    throw new Error('menuItemId and a valid quantity are required');
}

    // check if the food item actually exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
        res.status(404);
        throw new Error('Food item not found');
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
        // user has no cart yet — create one
        cart = await Cart.create({
            userId: req.user._id,
            restaurantId: menuItem.restaurantId,
            items: [{ menuItemId, name: menuItem.name, price: menuItem.price, quantity }],
            totalPrice: menuItem.price * quantity
        });
    } else {
        // cart exists — check if item is already in it
        const existingItem = cart.items.find(
            item => item.menuItemId.toString() === menuItemId
        );

        if (existingItem) {
            // item already in cart — just increase quantity
            existingItem.quantity += quantity;
        } else {
            // new item — push to cart
            cart.items.push({
                menuItemId,
                name: menuItem.name,
                price: menuItem.price,
                quantity
            });
        }

        // recalculate total
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity, 0
        );

        await cart.save();
    }

    res.status(200).json({
        success: true,
        data: cart
    });
});

// update item quantity in cart
export const updateCart = asyncHandler(async (req, res) => {
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || quantity === undefined || quantity <= 0) {
    res.status(400);
    throw new Error('menuItemId and a valid quantity are required');
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const item = cart.items.find(
        item => item.menuItemId.toString() === menuItemId
    );

    if (!item) {
        res.status(404);
        throw new Error('Item not found in cart');
    }

    // update quantity
    item.quantity = quantity;

    // recalculate total
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    await cart.save();

    res.status(200).json({
        success: true,
        data: cart
    });
});

// remove single item from cart
export const removeFromCart = asyncHandler(async (req, res) => {
    const { menuItemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // filter out the item to remove
    cart.items = cart.items.filter(
        item => item.menuItemId.toString() !== menuItemId
    );

    // recalculate total
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    await cart.save();

    res.status(200).json({
        success: true,
        data: cart
    });
});

// clear entire cart
export const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndDelete({ userId: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    res.status(200).json({
        success: true,
        message: 'Cart cleared successfully'
    });
});