import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import slugify from 'slugify';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description, category, stock } = req.body;

    // If an image was uploaded via upload middleware, req.file.path will hold the Cloudinary URL
    const imageUrl = req.file ? req.file.path : (req.body.imageUrl || '');

    const product = new Product({
      name,
      price: Number(price),
      slug:slugify(name, { lower: true, strict: true }),
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
    const products = await Product.aggregate([

      {
        $addFields: {
          documentedPrice: {
            $multiply: ["$price", "$stock"]
          }
        }
      }

    ])
    res.status(200).json({
      success: true,
      totalProducts: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ _id: slug }, { slug }] }
      : { slug };

    const product = await Product.findOne(query);

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
    const imageUrl = req.file ? req.file.path : (req.body.imageUrl || req.body.imgUrl);

    const updateData: Record<string, any> = {};

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true });
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (category !== undefined) {
      updateData.category = category;
    }
    if (req.body.price !== undefined && req.body.price !== '') {
      updateData.price = Number(req.body.price);
    }
    if (req.body.stock !== undefined && req.body.stock !== '') {
      updateData.stock = Number(req.body.stock);
    }
    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl;
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