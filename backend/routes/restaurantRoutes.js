import express from 'express';
import { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, approveRestaurant } from '../controller/restaurantController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { isRestaurantOwner } from '../middleware/restaurantMiddleware.js';

const router = express.Router();

router.get('/', getAllRestaurants);                                         // public - anyone can view
router.post('/', protect, authorizeRoles('restaurantAdmin'), createRestaurant);  // logged in restaurant admin
router.patch('/:id', protect, isRestaurantOwner, updateRestaurant);       // only the owner of that restaurant
router.delete('/:id', protect, authorizeRoles('superAdmin'), deleteRestaurant);          // only super admin
router.patch('/:id/approve', protect, authorizeRoles('superAdmin'), approveRestaurant);  // only super admin 

export default router;