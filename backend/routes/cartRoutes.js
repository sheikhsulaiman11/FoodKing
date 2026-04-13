import express from 'express';
const router = express.Router();
import {getCart, addToCart, updateCart, removeFromCart} from '../controller/cartController.js';
import { ProtectedRoute } from '../middleware/auth.js';

router.get('/', ProtectedRoute , getCart);
router.post('/add', ProtectedRoute , addToCart);
router.patch('/update', ProtectedRoute , updateCart);
router.delete('/remove/:productId', ProtectedRoute , removeFromCart);

export default router;