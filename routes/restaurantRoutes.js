import express from 'express';
const router = express.Router();
import { createRestaurant, deleteRestaurant,getAllRestaurants, updateRestaurant } from '../controller/restaurantController.js';
import { authorizeRoles, ProtectedRoute } from '../middleware/auth.js';


router.post("/", createRestaurant)
router.get('/', ProtectedRoute,authorizeRoles('admin'), getAllRestaurants)
router.patch('/:id',ProtectedRoute,authorizeRoles('admin'), updateRestaurant)
router.delete('/:id',ProtectedRoute,authorizeRoles('admin'), deleteRestaurant)


export default router;