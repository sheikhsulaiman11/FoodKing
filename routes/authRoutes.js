import express from 'express';
const router = express.Router();
import {signup} from '../controller/authController.js'

router.post('/signup', signup)

export default router;
