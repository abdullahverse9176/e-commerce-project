import { Router } from 'express';
import { createProduct } from '../controllers/productcontroller';

const router = Router();

router.post('/create-product', createProduct);

export default router;