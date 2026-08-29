import { Router } from 'express';
import { createProduct } from '../controllers/productcontroller';
import { uploadSingleImage } from '../middlewares/uploadMiddleware';

const router = Router();

// Pass uploadSingleImage('image') middleware before controller
router.post('/create-product', uploadSingleImage('image'), createProduct);

export default router;