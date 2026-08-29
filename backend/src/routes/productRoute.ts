import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

router.post('/create-product', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, category, stock, imageUrl } = req.body;
        const product = new Product({
            name,
            price,
            description,
            category,
            stock,
            imageUrl,
        });
        const savedProduct = await product.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
});

export default router;