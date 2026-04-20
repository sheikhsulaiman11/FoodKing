import { Order } from '../model/orderModel.js';
import { Cart } from '../model/cartModel.js';
import asyncHandler from '../utils/asyncHandler.js';

// place a new order
export const placeOrder = asyncHandler(async (req, res) => {
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
        res.status(400);
        throw new Error('Delivery address is required');
    }

    // get the user's current cart
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error('Your cart is empty');
    }

    // create the order from cart data
    const order = await Order.create({
        userId: req.user._id,
        restaurantId: cart.restaurantId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        deliveryAddress,
        status: 'placed'
    });

    // clear the cart after order is placed
    await Cart.findOneAndDelete({ userId: req.user._id });

    res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order
    });
});

// get logged in user's order history
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id })
        .populate('restaurantId', 'name location')       // brings restaurant name + location
        .sort({ createdAt: -1 });                        // newest orders first

    res.status(200).json({
        success: true,
        data: orders
    });
});

// get a single order by id
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('restaurantId', 'name location')          //brings restaurant name and location
        .populate('items.menuItemId', 'name price image');    // brings items name, price and image

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // make sure the order belongs to the logged in user
    if (order.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this order');
    }

    res.status(200).json({
        success: true,
        data: order
    });
});

// get all orders for a restaurant (restaurant admin)
export const getRestaurantOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ restaurantId: req.params.restaurantId })
        .populate('userId', 'firstName lastName email')  // brings customer details
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: orders
    });
});

// update order status (restaurant admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const validStatuses = ['placed', 'accepted', 'preparing', 'outForDelivery', 'delivered'];

    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    res.status(200).json({
        success: true,
        message: 'Order status updated',
        data: order
    });
});

// get all orders on the platform (super admin)
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate('userId', 'firstName lastName email')        // gets users firstname, lastname and email
        .populate('restaurantId', 'name location')             // gets restaurants name and location
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: orders
    });
});