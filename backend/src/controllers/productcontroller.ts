import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description, category, stock } = req.body;

    // If an image was uploaded via upload middleware, req.file.path will hold the Cloudinary URL
    const imageUrl = req.file ? req.file.path : (req.body.imageUrl || '');

    const product = new Product({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock || 0),
      imageUrl,
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};