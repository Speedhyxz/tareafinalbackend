import { Router } from 'express';
import { addToCart,purchase } from '../controllers/cart.controller.js';
import { current } from '../middlewares/auth.js';
import { onlyUser } from '../middlewares/roles.js';

const router = Router();
router.post('/add', current, onlyUser, addToCart);
router.post('/purchase', current, onlyUser, purchase);

export default router;
