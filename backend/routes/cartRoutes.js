import express from 'express';
import { getCart, addToCart, updateCart, removeFromCart, clearCart } from '../controller/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.patch('/update', protect, updateCart);
router.delete('/remove/:menuItemId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router;