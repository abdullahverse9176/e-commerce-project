import { Router } from 'express';
import { createProduct, getProducts, getSingleProduct } from '../controllers/productcontroller';
import { uploadSingleImage } from '../middlewares/uploadMiddleware';

const router = Router();

// Pass uploadSingleImage('image') middleware before controller
router.post('/create-product', uploadSingleImage('image'), createProduct);

router.get('/get-products', getProducts);

router.get('/get-single-product/:id', getSingleProduct);

export default router;