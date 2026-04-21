import express from 'express';
import { getMenuByRestaurant, getMenuItem, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } from '../controller/menuController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { isRestaurantOwner } from '../middleware/restaurantMiddleware.js';

const router = express.Router();

router.get('/restaurant/:restaurantId', getMenuByRestaurant);                               // public
router.get('/:id', getMenuItem);                                                            // public
router.post('/', protect, authorizeRoles('restaurantAdmin'), addMenuItem);                  // restaurant admin only
router.patch('/:id', protect, isRestaurantOwner, updateMenuItem);                          // restaurant owner only
router.delete('/:id', protect, isRestaurantOwner, deleteMenuItem);                         // restaurant owner only
router.patch('/:id/toggle', protect, isRestaurantOwner, toggleAvailability);               // restaurant owner only

export default router;