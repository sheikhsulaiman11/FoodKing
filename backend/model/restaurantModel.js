import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true  // one restaurant per owner
    }
}, { timestamps: true });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);