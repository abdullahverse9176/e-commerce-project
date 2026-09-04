import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getSingleCategory, updateCategory } from '../controllers/categoryController';

const router = Router();

// Product CRUD routes
router.post('/create-category', createCategory);
router.get('/get-categories', getCategories);
router.get('/get-single-category/:id', getSingleCategory);
router.delete('/delete-category/:id', deleteCategory);
router.patch('/update-category/:id', updateCategory);

export default router;