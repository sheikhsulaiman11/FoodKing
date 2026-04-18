import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food item name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    image: {
        type: String,
        default: '',                  // URL of the food image
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks', 'Desserts'],
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',            // links this item to a restaurant
        required: [true, 'Restaurant ID is required'],
    },
    isAvailable: {
        type: Boolean,
        default: true,                // restaurant can mark items out of stock
    },
}, { timestamps: true });

export const Menu = mongoose.model('Menu', menuSchema);