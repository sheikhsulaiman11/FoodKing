import express from 'express';
import { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, approveRestaurant } from '../controller/restaurantController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRestaurants);                                                           // public
router.post('/', protect, createRestaurant);                                                 // restaurant admin
router.patch('/:id', protect, authorizeRoles('superAdmin'), updateRestaurant);               // super admin
router.delete('/:id', protect, authorizeRoles('superAdmin'), deleteRestaurant);              // super admin
router.patch('/:id/approve', protect, authorizeRoles('superAdmin'), approveRestaurant);      // super admin

export default router;