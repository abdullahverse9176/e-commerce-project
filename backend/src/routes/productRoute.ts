import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../controllers/productcontroller';
import { uploadSingleImage } from '../middlewares/uploadMiddleware';

const router = Router();

// Pass uploadSingleImage('image') middleware before controller
router.post('/create-product', uploadSingleImage('image'), createProduct);

router.get('/get-products', getProducts);

router.get('/get-single-product/:id', getSingleProduct);

router.delete('/delete-product/:id', deleteProduct);

router.patch('/update-product/:id', uploadSingleImage('image'), updateProduct);

export default router;