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

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {

    const { name, description, category } = req.body;
    const imgUrl = req.file ? req.file.path : req.body.imgUrl;

    const price = Number(req.body.price);
    const stock = Number(req.body.stock);

    const updateData = {
      name, price, description, category, stock, imgUrl
    } 

    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};