import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  required: true
  },

   owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }

  // menu: [
  //   {
  //   itemName: {
  //       type: String,
  //       required: true,
  //   },
  //   price: {
  //       type: Number,
  //       required: true
  //   },
  //   description: {
  //       type: String,
  //       required: true
  //   }
  //   }
  // ]
});

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);