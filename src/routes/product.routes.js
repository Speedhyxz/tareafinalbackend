import { Router } from 'express';
import { createProduct,updateProduct,deleteProduct,listProducts } from '../controllers/product.controller.js';
import { current } from '../middlewares/auth.js';
import { onlyAdmin } from '../middlewares/roles.js';

const router = Router();
router.get('/', listProducts);
router.post('/', current, onlyAdmin, createProduct);
router.put('/:pid', current, onlyAdmin, updateProduct);
router.delete('/:pid', current, onlyAdmin, deleteProduct);

export default router;
