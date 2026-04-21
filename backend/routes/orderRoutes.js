import express from 'express';
import { placeOrder, getMyOrders, getOrderById, getRestaurantOrders, updateOrderStatus, getAllOrders } from '../controller/orderController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { isRestaurantOwner } from '../middleware/restaurantMiddleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);                                                              // logged in user
router.get('/my-orders', protect, getMyOrders);                                                    // logged in user
router.get('/:id', protect, getOrderById);                                                         // logged in user
router.get('/restaurant/:restaurantId', protect, isRestaurantOwner, getRestaurantOrders);          // restaurant owner only
router.patch('/:id/status', protect, isRestaurantOwner, updateOrderStatus);                        // restaurant owner only
router.get('/all', protect, authorizeRoles('superAdmin'), getAllOrders);                            // super admin only

export default router;