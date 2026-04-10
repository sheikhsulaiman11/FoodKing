import express from 'express';
const router = express.Router();
// import { isauth } from '../middleware/auth.js';
import { createRestaurant, deleteRestaurant,getAllRestaurants, updateRestaurant } from '../controller/restaurantController.js';


router.post("/", createRestaurant)
router.get('/',getAllRestaurants)
router.patch('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

export default router;