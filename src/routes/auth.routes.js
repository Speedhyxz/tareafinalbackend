import { Router } from 'express';
import { register,login,currentUser,requestReset,resetPassword } from '../controllers/auth.controller.js';
import { current } from '../middlewares/auth.js';

const router = Router();
router.post('/register',register);
router.post('/login',login);
router.get('/current',current,currentUser);
router.post('/password/forgot',requestReset);
router.post('/password/reset',resetPassword);

export default router;
