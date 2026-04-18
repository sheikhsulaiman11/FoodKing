import mongoose from "mongoose";

const userCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: Number,  
        required: true
      },
      name: String,   
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

export const Cart = mongoose.model('Cart', cartSchema);