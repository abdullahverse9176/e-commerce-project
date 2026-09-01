import { Request, Response } from 'express';
import slugify from 'slugify';
import Category from '../models/Category';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const category = new Category({
      name:name,
      slug:slugify(name,{lower:true,trim:true})
    });

    const savedCategory = await category.save();

    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
 
};

export const getSingleCategory = async (req: Request, res: Response): Promise<void> => {
 
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
 
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
 
};