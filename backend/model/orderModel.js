import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [
        {
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu'
            },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['placed', 'accepted', 'preparing', 'outForDelivery', 'delivered'],
        default: 'placed'
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);