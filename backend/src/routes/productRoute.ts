import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../controllers/productcontroller';
import { uploadSingleImage } from '../middlewares/uploadMiddleware';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Only Admin can create, update, or delete products
router.post('/create-product', requireAuth, requireAdmin, uploadSingleImage('image'), createProduct);

router.get('/get-products', getProducts);

router.get('/get-single-product/:id', getSingleProduct);

router.delete('/delete-product/:id', requireAuth, requireAdmin, deleteProduct);

router.patch('/update-product/:id', requireAuth, requireAdmin, uploadSingleImage('image'), updateProduct);

export default router;